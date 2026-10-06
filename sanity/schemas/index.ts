import client from "./client";
import homePage from "./homePage";
import journalPost from "./journalPost";
import {
  footerCredit,
  footerNavItem,
  formField,
  milestoneItem,
  navCta,
  navItem,
  projectMedia,
  serviceCard,
  socialLink,
} from "./objects";
import project from "./project";
import siteSettings from "./siteSettings";

export const schemaTypes = [
  siteSettings,
  homePage,
  project,
  journalPost,
  client,
  navItem,
  navCta,
  formField,
  footerNavItem,
  socialLink,
  footerCredit,
  serviceCard,
  milestoneItem,
  projectMedia,
];
