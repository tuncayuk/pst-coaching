import mockDataJson from "../../../artifacts/mock/mock_data.json";
import { getMockData } from "../config/mockData";

export type MockData = typeof mockDataJson;

const getData = (): MockData | null => getMockData();

const getList = <T>(list?: T[]): T[] => list ?? [];

export const getUsers = () => getList(getData()?.users);
export const getPrimaryUser = () => getUsers()[0];

export const getSubscriptions = () => getList(getData()?.subscriptions);
export const getSubscriptionPlans = () => getList(getData()?.subscription_plans);
export const getAddOns = () => getList(getData()?.add_ons);
export const getSubscriptionAddOns = () => getList(getData()?.subscription_add_ons);
export const getSeats = () => getList(getData()?.seats);
export const getInvitations = () => getList(getData()?.invitations);
export const getPaymentTransactions = () => getList(getData()?.payment_transactions);

export const getJourneys = () => getList(getData()?.journeys);
export const getJourneyDays = () => getList(getData()?.journey_days);
export const getModules = () => getList(getData()?.modules);
export const getPackages = () => getList(getData()?.packages);
export const getWorkshops = () => getList(getData()?.workshops);
export const getEbooks = () => getList(getData()?.ebooks);
export const getEbookChapters = () => getList(getData()?.ebook_chapters);
export const getContentItems = () => getList(getData()?.content_items);
export const getExerciseSteps = () => getList(getData()?.exercise_steps);
export const getContentProgress = () => getList(getData()?.content_progress);
export const getComments = () => getList(getData()?.comments);
export const getHighlights = () => getList(getData()?.highlights);
export const getNotes = () => getList(getData()?.notes);
export const getFavorites = () => getList(getData()?.favorites);
export const getCollections = () => getList(getData()?.collections);
export const getCollectionItems = () => getList(getData()?.collection_items);
export const getEbookProgress = () => getList(getData()?.ebook_progress);
export const getDownloads = () => getList(getData()?.downloads);
export const getAchievements = () => getList(getData()?.achievements);
export const getContentReviews = () => getList(getData()?.content_reviews);
export const getAccessibilitySettings = () => getList(getData()?.accessibility_settings);
export const getReadingSettings = () => getList(getData()?.reading_settings);
export const getReminderSettings = () => getList(getData()?.reminder_settings);

export const getSubscriptionForUser = (userId?: string) =>
  getSubscriptions().find((subscription) => subscription.owner_user_id === userId);

export const getPlanForSubscription = (planId?: string) =>
  getSubscriptionPlans().find((plan) => plan.id === planId);

export const getAddOnsForSubscription = (subscriptionId?: string) => {
  const activeAddOnIds = new Set(
    getSubscriptionAddOns()
      .filter((item) => item.subscription_id === subscriptionId)
      .map((item) => item.addon_id)
  );
  return getAddOns().filter((addon) => activeAddOnIds.has(addon.id));
};

export const getSeatsForSubscription = (subscriptionId?: string) =>
  getSeats().filter((seat) => seat.subscription_id === subscriptionId);

export const getInvitesForSubscription = (subscriptionId?: string) =>
  getInvitations().filter((invite) => invite.subscription_id === subscriptionId);

export const getPaymentsForSubscription = (subscriptionId?: string) =>
  getPaymentTransactions().filter((tx) => tx.subscription_id === subscriptionId);

export const getJourneyById = (id?: string) => getJourneys().find((journey) => journey.id === id);
export const getJourneyDaysForJourney = (journeyId?: string) =>
  getJourneyDays().filter((day) => day.journey_id === journeyId);
export const getModuleById = (id?: string) => getModules().find((module) => module.id === id);
export const getPackagesForModule = (moduleId?: string) =>
  getPackages().filter((pkg) => pkg.module_id === moduleId);
export const getWorkshopById = (id?: string) =>
  getWorkshops().find((workshop) => workshop.id === id);
export const getEbookById = (id?: string) => getEbooks().find((ebook) => ebook.id === id);
export const getEbookChaptersForEbook = (ebookId?: string) =>
  getEbookChapters().filter((chapter) => chapter.ebook_id === ebookId);

export const getContentItemsForParent = (parentType: string, parentId?: string) =>
  getContentItems().filter(
    (item) => item.parent_type === parentType && item.parent_id === parentId
  );

export const getContentProgressForUser = (userId?: string) =>
  getContentProgress().filter((progress) => progress.user_id === userId);

export const getEbookProgressForUser = (userId?: string) =>
  getEbookProgress().filter((progress) => progress.user_id === userId);

export const getHighlightsForUser = (userId?: string) =>
  getHighlights().filter((highlight) => highlight.user_id === userId);

export const getNotesForUser = (userId?: string) =>
  getNotes().filter((note) => note.user_id === userId);

export const getFavoritesForUser = (userId?: string) =>
  getFavorites().filter((favorite) => favorite.user_id === userId);

export const getCollectionsForUser = (userId?: string) =>
  getCollections().filter((collection) => collection.user_id === userId);

export const getDownloadsForUser = (userId?: string) =>
  getDownloads().filter((download) => download.user_id === userId);
