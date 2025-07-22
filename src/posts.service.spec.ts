import { Post, PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;
  const post: Omit<Post, "id" | "date"> = {
    text: "Mocked post",
  };

  beforeEach(async () => {
    postsService = new PostsService();
    postsService.create({ text: "Some pre-existing post" });
  });

  it("should add a new post", () => {
    const initialCount = postsService["posts"].length;
    const newPost = postsService.create(post);

    expect(postsService["posts"].length).toBe(initialCount + 1);

    expect(newPost).toMatchObject(post);
    expect(newPost).toHaveProperty("id");
    expect(newPost).toHaveProperty("date");
    expect(typeof newPost.id).toBe("string");
    expect(() => new Date(newPost.date)).not.toThrow();

    expect(postsService["posts"]).toContainEqual(newPost);
  });

  it("should find a post", () => {
    const newPost = postsService.create(post);

    const foundPost = postsService.find(newPost.id);

    expect(foundPost).toEqual(newPost);

    const nonExistentPost = postsService.find("non-existent-id");
    expect(nonExistentPost).toBeUndefined();
  });
});
