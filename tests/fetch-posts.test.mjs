import test from "node:test";
import assert from "node:assert/strict";
import { fetchPostsResponse } from "../lib/fetch-posts.ts";

const noWait = async () => {};
test("recovers from a dropped upstream connection", async () => {
  let calls = 0;
  const response = await fetchPostsResponse("https://example.test", async () => {
    if (++calls === 1) throw new TypeError("fetch failed");
    return Response.json([{ id: 1 }]);
  }, noWait);
  assert.equal(calls, 2);
  assert.deepEqual(await response.json(), [{ id: 1 }]);
});
test("does not retry a missing post", async () => {
  let calls = 0;
  const response = await fetchPostsResponse("https://example.test", async () => {
    calls += 1;
    return new Response(null, { status: 404 });
  }, noWait);
  assert.equal(response.status, 404);
  assert.equal(calls, 1);
});
test("limits retries on repeated upstream failures", async () => {
  let calls = 0;
  const response = await fetchPostsResponse("https://example.test", async () => {
    calls += 1;
    return new Response(null, { status: 503 });
  }, noWait);
  assert.equal(response.status, 503);
  assert.equal(calls, 3);
});
test("rethrows persistent network failure after three attempts", async () => {
  let calls = 0;
  await assert.rejects(fetchPostsResponse("https://example.test", async () => {
    calls += 1;
    throw new TypeError("fetch failed");
  }, noWait), /fetch failed/);
  assert.equal(calls, 3);
});
