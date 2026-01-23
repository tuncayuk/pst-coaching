import { ContentStackParamList } from "../ContentStack";
import { ScreenState } from "../../screens/components/ScreenState";

const validState: ScreenState = "ready";

const validEbookParams: ContentStackParamList["ContentEbookDetail"] = {
  id: "ebook-1",
  state: validState,
};

const validReviewParams: ContentStackParamList["ContentReviewPrompt"] = {
  id: "review-1",
  targetType: "ebook",
};

const validPaywallParams: ContentStackParamList["ContentPaywall"] = { state: "offline" };

const validPaywallNoParams: ContentStackParamList["ContentPaywall"] = undefined;

const validCommentParams: ContentStackParamList["ContentComment"] = {
  contentItemId: "content-1",
  state: "loading",
};

// @ts-expect-error missing id
const invalidEbookParams: ContentStackParamList["ContentEbookDetail"] = {
  state: "ready",
};

// @ts-expect-error missing targetType
const invalidReviewParams: ContentStackParamList["ContentReviewPrompt"] = {
  id: "review-2",
};

// @ts-expect-error missing contentItemId
const invalidCommentParams: ContentStackParamList["ContentComment"] = {
  state: "ready",
};

export {
  validEbookParams,
  validReviewParams,
  validPaywallParams,
  validPaywallNoParams,
  validCommentParams,
};
