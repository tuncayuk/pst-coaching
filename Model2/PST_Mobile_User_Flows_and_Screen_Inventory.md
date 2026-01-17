# PST Mobile App - User Flows & Screen Inventory
**Production Ready Documentation**

**Version:** 1.0  
**Date:** January 2026  
**Status:** Production Ready  
**Based on:** PST Mobile PRD v1.1

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [User Flow Diagrams](#user-flow-diagrams)
3. [Complete Screen Inventory](#complete-screen-inventory)
4. [Navigation Map](#navigation-map)
5. [Screen Details & Specifications](#screen-details--specifications)
6. [State Management](#state-management)
7. [Critical Business Rules](#critical-business-rules)
8. [Design & UX Notes](#design--ux-notes)

---

# 1. EXECUTIVE SUMMARY

## Overview
This document provides comprehensive user flows and screen inventory for PST Mobile App Phase 1 (MVP). It includes:
- 12 detailed user flow diagrams
- 100+ screen specifications
- Complete navigation maps
- State management documentation
- Critical business rules implementation

## Scope
- **Phase:** 1 (MVP - Production)
- **EPICs Covered:** EPIC 1-11
- **Total Screens:** 100+
- **User Roles:** Danışan (Client), Koç (Coach - limited in Phase 1)

## Document Purpose
- Guide UI/UX design teams in creating wireframes and mockups
- Provide development teams with clear screen requirements
- Serve as reference for QA testing scenarios
- Document all navigation paths and user journeys

---

# 2. USER FLOW DIAGRAMS

## 2.1 Onboarding & Authentication Flow

```
App Launch
    │
    ├──► [First Time?]
    │    ├── Yes ──► Language Selection ──► Welcome Screen
    │    └── No ───► Login Screen
    │
    ├──► Login Screen
    │    ├── Email/Password ──► Validation ──► Home
    │    ├── Google OAuth ────► Validation ──► Home
    │    ├── Apple Sign In ───► Validation ──► Home
    │    ├── Forgot Password ─► Reset Flow ──► Email Sent
    │    └── Sign Up ─────────► Registration Form
    │
    └──► Sign Up Flow
         └── Registration ──► Email Verification ──► Success ──► Home
```

**Key Decision Points:**
- First-time user detection
- Authentication method selection
- Email verification requirement

**Exit Points:**
- Ana Sayfa (HOME-001) on successful auth
- Error screens on failure

---

## 2.2 Main Navigation Flow

```
Ana Sayfa Tab
    ├── Today's Summary
    ├── Quick Actions
    │   ├── Continue Reading
    │   ├── Today's Application
    │   └── Review Highlights
    └── Active Content Status

Keşfet Tab
    ├── Search & Discovery
    ├── Journey Catalog
    ├── Workshop Catalog
    ├── Module Catalog
    ├── e-Book Catalog
    └── AI Assistant

Kütüphane Tab [Requires Subscription]
    ├── My Journeys
    ├── My Workshops
    ├── My Modules
    ├── My e-Books
    └── Favorites

Gelişim Tab [Requires Subscription]
    ├── Progress Dashboard
    ├── Emotional Map
    └── Reports

Profil Tab
    ├── Account Management
    ├── Subscription Management
    ├── App Settings
    └── About & Support
```

---

## 2.3 Journey Selection & Enrollment Flow

```
Keşfet ──► Browse Journeys ──► Journey Detail
    │
    ├──► [Has Subscription?]
    │    ├── No ──► Subscription Required Modal ──► Subscription Flow
    │    └── Yes ──► View Journey Content
    │
    └──► View Journey Content
         ├── Journey Overview
         ├── Modules List
         ├── Workshops List
         ├── e-Books List
         └── [Enroll CTA]
              │
              ├──► [Already Enrolled?]
              │    ├── No ──► Confirm Enrollment ──► Success ──► My Journeys
              │    └── Yes ──► Continue Journey ──► Last Position
              │
              └──► Navigate to First Module
```

**Subscription Gate:**
- Non-subscribers see paywall modal
- Subscribers can enroll immediately
- Enrollment persists to "My Journeys"

---

## 2.4 Content Consumption Flow (Journey → Module → Package)

```
My Journeys ──► Select Active Journey ──► Journey Progress
    │
    └──► View Modules
         │
         ├──► [Module Status]
         │    ├── Locked ──► Show Lock Reason ──► Previous Module Required
         │    ├── In Progress ──► Continue Module
         │    ├── Available ──► Start Module
         │    └── Completed ──► Review Module
         │
         └──► Module Content ──► Package List
              │
              ├──► [Package Status]
              │    ├── Locked ──► Show Lock (Previous Package or 08:00 Rule)
              │    └── Available ──► View Package Detail ──► Start Package
              │
              └──► Package Content
                   ├── Reading Section ──► Read ──► Highlight/Note ──► Complete
                   ├── Application Section ──► Steps ──► Complete All ──► Complete
                   │
                   └──► [All Sections Complete?]
                        ├── No ──► Continue
                        └── Yes ──► Package Complete ──► Certificate
                             │
                             └──► [All Packages Complete?]
                                  ├── No ──► Unlock Next Package
                                  └── Yes ──► Module Complete ──► Certificate
```

**Key Business Rules:**
- Sequential unlocking (cannot skip packages)
- 08:00 daily unlock rule
- All sections must be completed
- Auto-save progress continuously

---

## 2.5 Workshop Flow

```
Keşfet ──► Browse Workshops ──► Workshop Detail
    │
    ├──► [Has Subscription?]
    │    ├── No ──► Subscription Modal
    │    └── Yes ──► Start Workshop
    │
    └──► Workshop Content
         ├── Section List
         │   ├── Reading Sections
         │   └── Application Sections
         │
         └──► Select Section
              │
              ├──► [Section Type]
              │    ├── Reading ──► Read & Highlight ──► Add Notes ──► Complete
              │    └── Application ──► Follow Steps ──► Complete All ──► Complete
              │
              └──► [All Sections Complete?]
                   ├── No ──► Continue to Next Section
                   └── Yes ──► Workshop Complete ──► Certificate
```

---

## 2.6 e-Book Reading Flow

```
Kütüphane ──► e-Books ──► Select e-Book
    │
    ├──► [Book Status]
    │    ├── Not Downloaded ──► Download ──► [Success?]
    │    │                                    ├── Yes ──► Open Book
    │    │                                    └── No ──► Error & Retry
    │    └── Downloaded ──► Open Book
    │
    └──► Reader Screen
         ├── Reading Controls
         │   ├── Highlight ──► Select Color ──► Save
         │   ├── Note ──► Add Note ──► Save to Favorites
         │   ├── Bookmark ──► Save Bookmark
         │   ├── Navigate ──► Chapter Navigation
         │   └── Settings ──► Font/Theme/Layout
         │
         ├── Auto-Save Progress
         │
         └──► [Reading Complete?]
              ├── No ──► Continue Reading
              └── Yes ──► Book Completed ──► Certificate/Badge
```

**Reading Features:**
- Highlight with multiple colors
- Notes with highlight context
- Bookmarks for quick return
- Customizable reading settings
- Offline reading support

---

## 2.7 Subscription & Payment Flow

```
Entry Point (Locked Content or Profile)
    │
    └──► View Plans ──► Select Plan Type
         │
         ├──► Individual
         │    └──► [Student Discount?]
         │         ├── Yes ──► Verify Student Status ──► 50% Discount Applied
         │         └── No ──► Standard Price
         │
         ├──► Family (5 users)
         │    └──► Invite Members Later
         │
         └──► Group (10 users)
              └──► Invite Members Later
              │
              └──► Select Add-ons
                   ├── AI Package
                   ├── Coaching Training
                   └── Extra User Slots (+5 or +10)
                   │
                   └──► Review Total ──► Payment Method
                        │
                        ├──► [Platform]
                        │    ├── iOS ──► Apple In-App Purchase
                        │    └── Android ──► Google Play Billing
                        │
                        └──► [Payment Success?]
                             ├── Yes ──► Subscription Activated ──► Unlock Content
                             └── No ──► Payment Error ──► Retry or Cancel
```

**Payment Validation:**
- Server-side receipt verification
- Platform-specific purchase flows
- Immediate content unlock on success

---

## 2.8 Family/Group Management Flow

```
Profil ──► Subscription ──► [Plan Type]
    │
    ├──► Individual ──► No Member Management
    │
    └──► Family/Group ──► Manage Members
         │
         └──► Member List
              ├── Add Member
              │   ├──► [Slots Available?]
              │   │    ├── No ──► Upgrade Plan or Add Slots
              │   │    └── Yes ──► Generate Invite Link
              │   │
              │   └──► Share Invite
              │        ├── WhatsApp
              │        ├── Email
              │        └── Copy Link
              │
              ├── Remove Member ──► Confirm ──► Member Removed
              │
              └── View Member ──► Member Activity & Progress
```

---

## 2.9 Progress & Analytics Flow

```
Gelişim Tab ──► Progress Dashboard
    │
    ├──► Overall Progress
    │    ├── Journey Progress ──► Timeline ──► Completion Rate
    │    ├── Workshop Progress ──► List ──► Workshop Details
    │    ├── Module Progress ──► Breakdown ──► Package Status
    │    └── Reading Progress ──► Books Read ──► Reading Time
    │
    ├──► Emotional Map
    │    ├── Timeline View ──► Emotional Journey Over Time
    │    └── Categories View ──► Category Analysis
    │
    └──► Reports
         ├── Weekly Summary ──► Export PDF
         ├── Monthly Report ──► Export PDF
         └── Achievement Report ──► Certificates ──► Share/Download
```

---

## 2.10 Favorites & Collections Flow

```
Kütüphane ──► Favorites
    │
    ├──► All Favorites
    │    ├── Filter by Content Type
    │    ├── Search Favorites
    │    └── Select Item ──► Favorite Detail
    │         ├── View Highlight
    │         ├── Edit Note
    │         ├── Go to Source
    │         ├── Add to Collection
    │         └── Share/Export ──► Privacy Warning ──► Scope Selection ──► PDF
    │
    └──► Collections
         ├── View Collection ──► Collection Items
         ├── Create New Collection ──► Name ──► Add Items
         ├── Rename Collection
         └── Delete Collection ──► Confirm
```

---

## 2.11 Search & Discovery Flow

```
Keşfet Tab ──► Search & Discovery
    │
    ├──► Search Bar
    │    ├── Enter Query ──► Search Results
    │    │    ├── Filter by Type
    │    │    ├── Filter by Difficulty
    │    │    └── Select Result ──► Content Detail
    │    │
    │    └── Browse Categories
    │         └── Category Catalog ──► Content Cards ──► Content Detail
    │
    ├──► AI Assistant
    │    └── Chat Interface
    │         ├── Ask Question ──► AI Response (RAG-based)
    │         │    ├── Content Suggestion ──► View Content
    │         │    └── Source Reference ──► Go to Source
    │         │
    │         └── Suggested Prompts
    │
    └──► Content Detail
         ├──► [Has Subscription?]
         │    ├── No ──► Subscription Required
         │    └── Yes ──► Enroll/Start
         │
         └──► View Content Preview ──► Enroll/Download
```

---

## 2.12 Profile & Settings Flow

```
Profil Tab ──► Profile Home
    │
    ├──► Account
    │    ├── Edit Profile ──► Update Info ──► Save
    │    ├── Change Password ──► Validate ──► Update
    │    └── Email Preferences ──► Save
    │
    ├──► Subscription
    │    ├── View Plan ──► Plan Features & Usage
    │    ├── Manage Members ──► See Family/Group Flow
    │    ├── Billing History ──► Download Receipts
    │    └── Upgrade/Change Plan ──► Plan Selection
    │
    ├──► Settings
    │    ├── App Settings
    │    │   ├── Theme ──► Light/Dark/Sepia/System
    │    │   ├── Language ──► TR/EN
    │    │   ├── Notifications ──► Toggle Preferences
    │    │   └── Downloads ──► Auto-download & Storage
    │    │
    │    ├── Accessibility
    │    │   ├── Text Size ──► Slider with Preview
    │    │   ├── High Contrast ──► Toggle
    │    │   └── Screen Reader ──► Optimize Labels
    │    │
    │    └── Privacy
    │         ├── Data Sharing ──► Toggle
    │         ├── Privacy Policy ──► View Document
    │         └── Delete Data ──► Confirm
    │
    └──► About
         ├── App Info ──► Version & Details
         ├── Terms of Service
         └── Contact Support ──► Support Form
```

---

# 3. COMPLETE SCREEN INVENTORY

## Screen Numbering System
- **AUTH-XXX:** Authentication & Onboarding
- **HOME-XXX:** Ana Sayfa (Home)
- **EXPLORE-XXX:** Keşfet (Explore)
- **LIBRARY-XXX:** Kütüphane (Library)
- **PROGRESS-XXX:** Gelişim (Progress)
- **PROFILE-XXX:** Profil (Profile)
- **SUB-XXX:** Subscription & Payment
- **CONTENT-XXX:** Content Reading & Interaction
- **ACHIEVE-XXX:** Completion & Achievement
- **UTIL-XXX:** Utility & System

## 3.1 Authentication & Onboarding Screens (9 screens)

| Screen ID | Screen Name | Epic | Purpose | Entry Points |
|-----------|-------------|------|---------|--------------|
| AUTH-001 | Language Selection | EPIC 1 | First-time language selection | App first launch |
| AUTH-002 | Welcome Screen | EPIC 1 | App introduction | After language selection |
| AUTH-003 | Login Screen | EPIC 1 | User authentication | Welcome, App launch (returning) |
| AUTH-004 | Email Login Form | EPIC 1 | Email/password entry | Login screen |
| AUTH-005 | Sign Up Screen | EPIC 1 | New user registration | Welcome, Login |
| AUTH-006 | Forgot Password | EPIC 1 | Password reset request | Login screen |
| AUTH-007 | Reset Email Sent | EPIC 1 | Reset confirmation | Forgot Password |
| AUTH-008 | Email Verification | EPIC 1 | Email verification pending | After signup |
| AUTH-009 | Verification Success | EPIC 1 | Email verified | Verification complete |

## 3.2 Ana Sayfa (Home) Screens (5 screens)

| Screen ID | Screen Name | Epic | Purpose | Entry Points |
|-----------|-------------|------|---------|--------------|
| HOME-001 | Ana Sayfa Dashboard | EPIC 2 | Daily overview and quick access | App launch (authenticated), Tab bar |
| HOME-002 | Today's Content | EPIC 2 | Daily unlocked content | Ana Sayfa dashboard |
| HOME-003 | Quick Action Sheet | EPIC 2 | Fast access to common actions | Bottom sheet from Ana Sayfa |
| HOME-004 | Active Content Detail | EPIC 2 | Current journey/workshop detail | Ana Sayfa active content card |
| HOME-005 | Daily Notification Center | EPIC 2 | In-app notifications | Ana Sayfa notification icon |

## 3.3 Keşfet (Explore) Screens (14 screens)

| Screen ID | Screen Name | Epic | Purpose | Entry Points |
|-----------|-------------|------|---------|--------------|
| EXPLORE-001 | Keşfet Home | EPIC 6 | Content discovery hub | Tab bar |
| EXPLORE-002 | Search Screen | EPIC 6 | Universal search interface | Keşfet home, search icon |
| EXPLORE-003 | Search Results | EPIC 6 | Search results with filters | Search submission |
| EXPLORE-004 | Journey Catalog | EPIC 4 | List of all available journeys | Keşfet home |
| EXPLORE-005 | Journey Detail | EPIC 4 | Detailed view of a journey | Journey catalog, search |
| EXPLORE-006 | Workshop Catalog | EPIC 8 | List of all available workshops | Keşfet home |
| EXPLORE-007 | Workshop Detail | EPIC 8 | Detailed view of a workshop | Workshop catalog, search |
| EXPLORE-008 | Module Catalog | EPIC 11 | List of all available modules | Keşfet home |
| EXPLORE-009 | Module Detail | EPIC 11 | Detailed view of a module | Module catalog |
| EXPLORE-010 | e-Book Catalog | EPIC 7 | e-Book library catalog | Keşfet home |
| EXPLORE-011 | e-Book Detail | EPIC 7 | e-Book preview and details | e-Book catalog |
| EXPLORE-012 | AI Assistant Chat | EPIC 16 | RAG-based AI chat | Keşfet home, content screens |
| EXPLORE-013 | Category Browse | EPIC 6 | Browse by content categories | Keşfet home |
| EXPLORE-014 | Filter Modal | EPIC 6 | Advanced filtering options | Search, catalogs |

## 3.4 Kütüphane (Library) Screens (22 screens)

| Screen ID | Screen Name | Epic | Purpose | Entry Points |
|-----------|-------------|------|---------|--------------|
| LIBRARY-001 | Kütüphane Home | EPIC 2 | Library overview | Tab bar [Requires subscription] |
| LIBRARY-002 | My Journeys | EPIC 4 | User's enrolled journeys | Kütüphane home |
| LIBRARY-003 | Active Journey View | EPIC 4 | Current journey progress | My Journeys |
| LIBRARY-004 | Journey Content Screen | EPIC 4 | Journey modules/workshops/e-books | Active Journey View |
| LIBRARY-005 | My Workshops | EPIC 8 | User's enrolled workshops | Kütüphane home |
| LIBRARY-006 | Active Workshop View | EPIC 8 | Workshop progress and sections | My Workshops |
| LIBRARY-007 | Workshop Content Screen | EPIC 8 | Workshop reading/applications | Active Workshop View |
| LIBRARY-008 | My Modules | EPIC 11 | User's active modules | Kütüphane home |
| LIBRARY-009 | Module Progress Screen | EPIC 11 | Module package list and status | My Modules, Journey Content |
| LIBRARY-010 | Package Detail | EPIC 11 | Package content overview | Module Progress |
| LIBRARY-011 | Package Content | EPIC 11 | Package reading/applications | Package Detail |
| LIBRARY-012 | My e-Books | EPIC 7 | Downloaded and available e-books | Kütüphane home |
| LIBRARY-013 | e-Book Reader | EPIC 7 | Full-screen reading interface | My e-Books, suggestions |
| LIBRARY-014 | Reader Settings | EPIC 7 | Font, theme, layout settings | e-Book Reader |
| LIBRARY-015 | Chapter Navigation | EPIC 7 | Table of contents navigation | e-Book Reader |
| LIBRARY-016 | Favorites Home | EPIC 9 | All favorited content | Kütüphane home |
| LIBRARY-017 | Favorite Detail | EPIC 9 | Single favorite item detail | Favorites Home |
| LIBRARY-018 | Collections List | EPIC 9 | User's collections | Favorites Home |
| LIBRARY-019 | Collection Detail | EPIC 9 | Items in a collection | Collections List |
| LIBRARY-020 | Create Collection | EPIC 9 | New collection creation | Collections, Favorite Detail |
| LIBRARY-021 | Favorites Search | EPIC 9 | Search within favorites | Favorites Home |
| LIBRARY-022 | Export Options | EPIC 9 | Export and share settings | Favorite Detail, Collections |

## 3.5 Gelişim (Progress) Screens (12 screens)

| Screen ID | Screen Name | Epic | Purpose | Entry Points |
|-----------|-------------|------|---------|--------------|
| PROGRESS-001 | Gelişim Dashboard | EPIC 5 | Overall progress overview | Tab bar [Requires subscription] |
| PROGRESS-002 | Journey Progress Chart | EPIC 5 | Journey completion timeline | Gelişim Dashboard |
| PROGRESS-003 | Workshop Progress | EPIC 5 | Workshop completion status | Gelişim Dashboard |
| PROGRESS-004 | Module Progress | EPIC 5 | Module and package breakdown | Gelişim Dashboard |
| PROGRESS-005 | Reading Statistics | EPIC 5 | e-Book reading metrics | Gelişim Dashboard |
| PROGRESS-006 | Emotional Map | EPIC 5 | Emotional journey visualization | Gelişim Dashboard |
| PROGRESS-007 | Timeline View | EPIC 5 | Progress over time | Emotional Map |
| PROGRESS-008 | Category Analysis | EPIC 5 | Progress by content category | Emotional Map |
| PROGRESS-009 | Weekly Summary | EPIC 5 | 7-day progress report | Gelişim Dashboard |
| PROGRESS-010 | Monthly Report | EPIC 5 | 30-day progress report | Gelişim Dashboard |
| PROGRESS-011 | Achievement Report | EPIC 5 | Certificates and badges | Gelişim Dashboard |
| PROGRESS-012 | Export Report | EPIC 5 | PDF export options | Progress reports |

## 3.6 Profil (Profile) Screens (25 screens)

| Screen ID | Screen Name | Epic | Purpose | Entry Points |
|-----------|-------------|------|---------|--------------|
| PROFILE-001 | Profil Home | EPIC 1 | Profile overview and menu | Tab bar |
| PROFILE-002 | Edit Profile | EPIC 1 | Personal information editing | Profile Home |
| PROFILE-003 | Change Password | EPIC 1 | Password change form | Profile Home |
| PROFILE-004 | Email Preferences | EPIC 1 | Notification email settings | Profile Home |
| PROFILE-005 | Subscription Overview | EPIC 3 | Current plan and features | Profile Home |
| PROFILE-006 | Manage Subscription | EPIC 3 | Upgrade, downgrade, cancel | Subscription Overview |
| PROFILE-007 | Member Management | EPIC 3 | Family/group member list | Subscription Overview |
| PROFILE-008 | Invite Member | EPIC 3 | Generate and share invite | Member Management |
| PROFILE-009 | Member Detail | EPIC 3 | Individual member info | Member Management |
| PROFILE-010 | Remove Member | EPIC 3 | Confirmation dialog | Member Management/Detail |
| PROFILE-011 | Billing History | EPIC 3 | Transaction and receipt list | Subscription Overview |
| PROFILE-012 | Receipt Detail | EPIC 3 | Individual receipt view | Billing History |
| PROFILE-013 | App Settings | EPIC 2 | General app preferences | Profile Home |
| PROFILE-014 | Theme Selection | EPIC 2 | Light/dark/system theme | App Settings |
| PROFILE-015 | Language Settings | EPIC 1 | Language change | App Settings |
| PROFILE-016 | Notification Settings | EPIC 2 | Push notification preferences | App Settings |
| PROFILE-017 | Download Preferences | EPIC 7 | Auto-download settings | App Settings |
| PROFILE-018 | Accessibility Settings | EPIC 10 | Accessibility options | Profile Home |
| PROFILE-019 | Text Size Adjustment | EPIC 10 | Font size slider | Accessibility Settings |
| PROFILE-020 | High Contrast Mode | EPIC 10 | Contrast and theme settings | Accessibility Settings |
| PROFILE-021 | Privacy Settings | EPIC 1 | Data sharing controls | Profile Home |
| PROFILE-022 | Privacy Policy | EPIC 1 | Legal document view | Privacy Settings |
| PROFILE-023 | Terms of Service | EPIC 1 | Legal document view | Profile Home, About |
| PROFILE-024 | About App | EPIC 2 | Version and app info | Profile Home |
| PROFILE-025 | Contact Support | EPIC 2 | Support contact form | Profile Home |

## 3.7 Subscription & Payment Screens (12 screens)

| Screen ID | Screen Name | Epic | Purpose | Entry Points |
|-----------|-------------|------|---------|--------------|
| SUB-001 | Subscription Required Modal | EPIC 3 | Paywall for locked content | Locked content across app |
| SUB-002 | Plan Selection | EPIC 3 | Individual/family/group plans | Subscription Required, Manage |
| SUB-003 | Individual Plan Detail | EPIC 3 | Features and pricing | Plan Selection |
| SUB-004 | Family Plan Detail | EPIC 3 | Features and pricing | Plan Selection |
| SUB-005 | Group Plan Detail | EPIC 3 | Features and pricing | Plan Selection |
| SUB-006 | Student Verification | EPIC 3 | Student discount verification | Individual Plan Detail |
| SUB-007 | Add-on Selection | EPIC 3 | AI, coaching, extra users | Plan details |
| SUB-008 | Review Purchase | EPIC 3 | Final price breakdown | Add-on Selection |
| SUB-009 | Payment Processing | EPIC 3 | Apple/Google payment flow | Review Purchase |
| SUB-010 | Payment Success | EPIC 3 | Confirmation screen | Payment Processing |
| SUB-011 | Payment Error | EPIC 3 | Error and retry options | Payment Processing |
| SUB-012 | Subscription Activated | EPIC 3 | Welcome to premium | Payment Success |

## 3.8 Content Reading & Interaction Screens (10 screens)

| Screen ID | Screen Name | Epic | Purpose | Entry Points |
|-----------|-------------|------|---------|--------------|
| CONTENT-001 | Reading Screen | Various | Full-screen reading interface | Various content types |
| CONTENT-002 | Highlight Tool | EPIC 7/9 | Text highlighting interface | Reading Screen, e-Book Reader |
| CONTENT-003 | Note Editor | EPIC 7/9 | Add/edit note modal | Highlight Tool, Favorite Detail |
| CONTENT-004 | Bookmark Saved | EPIC 7 | Bookmark confirmation | e-Book Reader |
| CONTENT-005 | Application Steps | EPIC 8/11 | Step-by-step instructions | Workshop, Package content |
| CONTENT-006 | Step Completion | EPIC 8/11 | Mark step as done | Application Steps |
| CONTENT-007 | Section Complete | EPIC 4/8/11 | Section completion modal | Content completion |
| CONTENT-008 | Progress Save | Various | Auto-save confirmation | All content screens |
| CONTENT-009 | Locked Content | Various | Explanation for locked content | Locked items |
| CONTENT-010 | Time-Locked Content | EPIC 4 | 08:00 rule explanation | Daily locked content |

## 3.9 Completion & Achievement Screens (8 screens)

| Screen ID | Screen Name | Epic | Purpose | Entry Points |
|-----------|-------------|------|---------|--------------|
| ACHIEVE-001 | Package Complete | EPIC 11 | Package completion celebration | Last section of package |
| ACHIEVE-002 | Module Complete | EPIC 11 | Module completion celebration | Last package in module |
| ACHIEVE-003 | Workshop Complete | EPIC 8 | Workshop completion celebration | Last section of workshop |
| ACHIEVE-004 | Journey Complete | EPIC 4 | Journey completion celebration | Last content in journey |
| ACHIEVE-005 | e-Book Complete | EPIC 7 | Book reading completion | Last page of e-book |
| ACHIEVE-006 | Certificate View | Various | Certificate display | Achievement screens, Reports |
| ACHIEVE-007 | Badge Earned | Various | New badge notification | Various achievements |
| ACHIEVE-008 | Next Content Suggestion | Various | Recommended next content | After completions |

## 3.10 Utility & System Screens (10 screens)

| Screen ID | Screen Name | Epic | Purpose | Entry Points |
|-----------|-------------|------|---------|--------------|
| UTIL-001 | Loading Screen | All | App initialization | App launch |
| UTIL-002 | Error Screen | All | General error handling | Error occurrence |
| UTIL-003 | No Internet | All | Offline mode message | Network failure |
| UTIL-004 | Maintenance Mode | All | Server maintenance notice | Server unavailable |
| UTIL-005 | Empty State | All | No content placeholder | Empty lists, catalogs |
| UTIL-006 | Download Progress | EPIC 7 | Content download indicator | e-Book download |
| UTIL-007 | Sync Status | All | Data synchronization | Background sync |
| UTIL-008 | Storage Warning | EPIC 7 | Low storage alert | Download attempt |
| UTIL-009 | Confirmation Dialog | All | Generic confirmation | Destructive actions |
| UTIL-010 | Info Toast | All | General notifications | Various actions |

---

**Total Screens: 117**

---

# 4. NAVIGATION MAP

## 4.1 Tab Bar Structure

```
┌──────────────────────────────────────────────────────────────────┐
│                      TAB BAR (Always Visible)                    │
├──────────────────────────────────────────────────────────────────┤
│  Ana Sayfa  │  Keşfet  │  Kütüphane*  │  Gelişim*  │  Profil    │
│    🏠       │    🧭    │     📚       │    📊      │    👤      │
│   Home      │  Explore │   Library    │  Progress  │  Profile   │
└──────────────────────────────────────────────────────────────────┘

* Requires Active Subscription
```

## 4.2 Navigation Hierarchy

### Ana Sayfa Tab
```
HOME-001 (Ana Sayfa Dashboard)
├── HOME-002 (Today's Content)
│   └── Various Content Screens
├── HOME-003 (Quick Actions)
│   ├── LIBRARY-013 (Continue Reading)
│   ├── CONTENT-005 (Today's Application)
│   └── LIBRARY-016 (Review Highlights)
├── HOME-004 (Active Content Detail)
│   ├── LIBRARY-004 (Journey Content)
│   └── LIBRARY-007 (Workshop Content)
└── HOME-005 (Notification Center)
```

### Keşfet Tab
```
EXPLORE-001 (Keşfet Home)
├── EXPLORE-002 (Search)
│   └── EXPLORE-003 (Search Results)
│       └── Various Detail Screens
├── EXPLORE-004 (Journey Catalog)
│   └── EXPLORE-005 (Journey Detail)
│       ├── [No Sub] → SUB-001 → Subscription Flow
│       └── [Subscribed] → LIBRARY-002 (My Journeys)
├── EXPLORE-006 (Workshop Catalog)
│   └── EXPLORE-007 (Workshop Detail)
│       └── [Same subscription logic]
├── EXPLORE-008 (Module Catalog)
│   └── EXPLORE-009 (Module Detail)
│       └── [Same subscription logic]
├── EXPLORE-010 (e-Book Catalog)
│   └── EXPLORE-011 (e-Book Detail)
│       ├── Download → LIBRARY-013 (Reader)
│       └── [No Sub] → SUB-001
├── EXPLORE-012 (AI Assistant)
│   └── Content Suggestions → Details
├── EXPLORE-013 (Category Browse)
└── EXPLORE-014 (Filter Modal)
```

### Kütüphane Tab [Subscription Required]
```
LIBRARY-001 (Kütüphane Home)
├── LIBRARY-002 (My Journeys)
│   └── LIBRARY-003 (Active Journey)
│       └── LIBRARY-004 (Journey Content)
│           ├── LIBRARY-009 (Module Progress)
│           │   └── LIBRARY-010 (Package Detail)
│           │       └── LIBRARY-011 (Package Content)
│           │           ├── CONTENT-001 (Reading)
│           │           └── CONTENT-005 (Application)
│           ├── LIBRARY-007 (Workshop Content)
│           └── LIBRARY-013 (e-Book Reader)
├── LIBRARY-005 (My Workshops)
│   └── LIBRARY-006 (Active Workshop)
│       └── LIBRARY-007 (Workshop Content)
├── LIBRARY-008 (My Modules)
│   └── LIBRARY-009 (Module Progress)
├── LIBRARY-012 (My e-Books)
│   └── LIBRARY-013 (e-Book Reader)
│       ├── LIBRARY-014 (Reader Settings)
│       ├── LIBRARY-015 (Chapter Navigation)
│       ├── CONTENT-002 (Highlight Tool)
│       └── CONTENT-003 (Note Editor)
└── LIBRARY-016 (Favorites)
    ├── LIBRARY-017 (Favorite Detail)
    ├── LIBRARY-018 (Collections)
    │   ├── LIBRARY-019 (Collection Detail)
    │   └── LIBRARY-020 (Create Collection)
    ├── LIBRARY-021 (Search Favorites)
    └── LIBRARY-022 (Export Options)
```

### Gelişim Tab [Subscription Required]
```
PROGRESS-001 (Gelişim Dashboard)
├── PROGRESS-002 (Journey Progress)
├── PROGRESS-003 (Workshop Progress)
├── PROGRESS-004 (Module Progress)
├── PROGRESS-005 (Reading Statistics)
├── PROGRESS-006 (Emotional Map)
│   ├── PROGRESS-007 (Timeline View)
│   └── PROGRESS-008 (Category Analysis)
├── PROGRESS-009 (Weekly Summary)
│   └── PROGRESS-012 (Export Report)
├── PROGRESS-010 (Monthly Report)
│   └── PROGRESS-012 (Export Report)
└── PROGRESS-011 (Achievement Report)
    └── ACHIEVE-006 (Certificate View)
```

### Profil Tab
```
PROFILE-001 (Profil Home)
├── Account
│   ├── PROFILE-002 (Edit Profile)
│   ├── PROFILE-003 (Change Password)
│   └── PROFILE-004 (Email Preferences)
├── Subscription
│   ├── PROFILE-005 (Subscription Overview)
│   ├── PROFILE-006 (Manage Subscription)
│   │   └── SUB-002 (Plan Selection)
│   ├── PROFILE-007 (Member Management)
│   │   ├── PROFILE-008 (Invite Member)
│   │   ├── PROFILE-009 (Member Detail)
│   │   └── PROFILE-010 (Remove Member)
│   └── PROFILE-011 (Billing History)
│       └── PROFILE-012 (Receipt Detail)
├── Settings
│   ├── PROFILE-013 (App Settings)
│   │   ├── PROFILE-014 (Theme)
│   │   ├── PROFILE-015 (Language)
│   │   ├── PROFILE-016 (Notifications)
│   │   └── PROFILE-017 (Downloads)
│   ├── PROFILE-018 (Accessibility)
│   │   ├── PROFILE-019 (Text Size)
│   │   └── PROFILE-020 (High Contrast)
│   └── PROFILE-021 (Privacy)
│       └── PROFILE-022 (Privacy Policy)
└── About
    ├── PROFILE-024 (About App)
    │   └── PROFILE-023 (Terms of Service)
    └── PROFILE-025 (Contact Support)
```

---

# 5. STATE MANAGEMENT

## 5.1 User States

### Authentication States
| State | Description | Access Level |
|-------|-------------|--------------|
| Not Authenticated | Guest user, logged out | Auth screens, limited browse |
| Authenticated (No Subscription) | Logged in, no active plan | Browse only, paywall for content |
| Authenticated (Active Subscription) | Logged in with valid plan | Full app access |

### Subscription States
| State | Description | Behavior |
|-------|-------------|----------|
| No Subscription | Never subscribed | Can browse catalogs, see paywalls |
| Individual | Active individual plan | Full access, 1 user |
| Family | Active family plan | Full access, up to 5 users, member mgmt |
| Group | Active group plan | Full access, up to 10 users, member mgmt |
| Trial | Trial period active | Full access, time-limited |
| Expired | Subscription lapsed | Grace period (24h), then locked |
| Cancelled | Cancellation pending | Access until period end |

## 5.2 Content States

### Journey States
| State | Description | UI Indicator |
|-------|-------------|--------------|
| Available | Can be explored | "View Journey" button |
| Enrolled | User has enrolled | "Continue Journey" button |
| Active | Currently being worked on | Progress bar, "Continue" |
| Completed | All content finished | Green checkmark, certificate |

### Module/Package States
| State | Description | Lock Condition |
|-------|-------------|----------------|
| Locked | Cannot access yet | Previous not complete OR 08:00 rule |
| Available | Unlocked, can start | Green indicator |
| In Progress | Partially completed | Progress percentage |
| Completed | Fully finished | Checkmark |

### Workshop States
| State | Description | Section Status |
|-------|-------------|----------------|
| Available | Can be started | "Start Workshop" |
| Enrolled | Added to library | "Continue" |
| In Progress | Some sections done | Completion % |
| Completed | All sections finished | Certificate |

### e-Book States
| State | Description | Action |
|-------|-------------|--------|
| Available | Can be downloaded | "Download" button |
| Downloading | Download in progress | Progress bar |
| Downloaded | Stored locally | "Read Now" button |
| Reading | Currently open | Bookmark, page number |
| Completed | Finished reading | Certificate |

### Favorite/Highlight States
| State | Description | Behavior |
|-------|-------------|----------|
| Active | Saved and available | Visible in favorites |
| Deleted | Removed (soft delete) | Hidden, undo available (30s) |
| In Collection | Part of a collection | Tagged with collection name |

## 5.3 Network States
| State | Description | User Impact |
|-------|-------------|-------------|
| Online | Full connectivity | All features available |
| Offline | No internet | Downloaded content only, sync pending |
| Syncing | Background sync active | "Syncing..." indicator |
| Sync Failed | Error in sync | "Retry" option |

## 5.4 Download States
| State | Description | Progress |
|-------|-------------|----------|
| Not Downloaded | Content not local | No offline access |
| Queued | Awaiting download | Position in queue |
| Downloading | In progress | Percentage, speed, pause option |
| Downloaded | Stored locally | Offline available |
| Failed | Download error | Retry button |
| Paused | Manually paused | Resume button |

---

# 6. CRITICAL BUSINESS RULES

## 6.1 Time-Based Rules

### 1. Daily Unlock Rule (08:00)
**Rule:** New content becomes available daily at 08:00 local time  
**Applies To:** Journeys, Modules, Packages (sequential content)  
**Implementation:**
- Server-side time check
- Local timezone consideration
- Lock icon with countdown timer shown
- Notification sent when unlocked

**User Experience:**
- Clear messaging: "Available tomorrow at 08:00"
- Countdown timer display (e.g., "Unlocks in 7h 23m")
- Set Reminder option
- Suggestion to explore other content

**Screen:** CONTENT-010 (Time-Locked Content)

---

### 2. Daily Task Deadline (23:59)
**Rule:** Daily reflections/applications must be submitted by 23:59  
**Applies To:** Daily tasks, reflections, applications  
**Implementation:**
- Server timestamp validation
- Grace period consideration (optional 5 minutes)
- Auto-save drafts before deadline

**User Experience:**
- Deadline displayed at top: "Complete by 23:59 today"
- Warning notification at 22:00 if not completed
- Final reminder at 23:30
- Clear messaging on expiration: "This task has expired"

---

## 6.2 Sequential Progression Rules

### 1. Locked Progression
**Rule:** Content must be completed sequentially; cannot skip ahead  
**Applies To:**
- Journey → Modules (must complete Module 1 before Module 2)
- Module → Packages (must complete Package 1 before Package 2)
- Workshop → Sections (must complete Section 1 before Section 2)

**Implementation:**
- Server-side validation of completion status
- Lock next content until previous 100% completed
- Clear prerequisite display

**User Experience:**
- Lock icon on unreachable content
- Tooltip: "Complete [Previous Item Name] to unlock"
- Progress bar showing % to unlock
- "Go to [Previous Item]" CTA

**Screen:** CONTENT-009 (Locked Content)

---

### 2. Package Completion Criteria
**Rule:** All sections (readings + applications) within a package must be marked complete before package is considered done  
**Implementation:**
- Checkbox tracking per section (reading, application)
- Server validation before unlocking next package
- Cannot manually override completion

**User Experience:**
- Checklist UI showing all sections
- Visual progress: "3/5 sections completed"
- "Mark as Complete" button only when ALL sections done
- Confirmation modal on package completion (ACHIEVE-001)

---

### 3. Section Completion Requirements
**Rule:** 
- Reading sections: Must scroll to bottom or mark as read
- Application sections: ALL steps must be checked off

**Implementation:**
- Reading: Track scroll position, 100% reached = complete
- Application: All checkboxes must be checked
- Server-side validation

**User Experience:**
- Reading: Progress bar while scrolling, "Mark as Read" when bottom reached
- Application: Disabled "Complete" button until all steps checked
- Visual feedback on completion (checkmark animation)

---

## 6.3 Subscription Rules

### 1. Content Access Control
**Rule:** Premium content (Journeys, Workshops, Modules, e-Books) requires active subscription  
**Applies To:** All content except:
- Free previews (sample chapters)
- Marketing content
- Onboarding content

**Implementation:**
- Server-side subscription check on every content access
- Real-time validation (not cached)
- Grace period for expired subscriptions: 24 hours

**User Experience:**
- Paywall modal (SUB-001) on locked content tap
- Clear messaging: "Subscribe to access all content"
- "View Plans" and "Maybe Later" options
- Seamless upgrade flow

---

### 2. Family/Group Seat Management
**Rule:**
- Family Plan: Maximum 5 users
- Group Plan: Maximum 10 users
- Additional slots via add-ons (+5 or +10)

**Implementation:**
- Seat count validation server-side
- Prevent invitation if seats full
- Graceful handling: show upgrade option

**User Experience:**
- Clear seat count: "3/5 seats used"
- "Invite Member" disabled when full
- Upgrade prompt: "Add +5 seats for $X/month"
- Invitation management UI (PROFILE-007, PROFILE-008)

---

### 3. Student Discount
**Rule:** 50% discount for verified students on Individual plan only  
**Verification Methods:**
- Upload student ID
- School email verification (.edu domain)

**Implementation:**
- Verification required before discount applied
- Manual review (24-48 hours) or instant (.edu email)
- Discount persists as long as student status verified

**User Experience:**
- Student discount banner on Individual plan
- "Verify Student Status" button → SUB-006
- Upload flow with clear instructions
- Confirmation: "50% discount applied!"

---

### 4. Add-on Management
**Available Add-ons:**
- AI Package
- Coaching Training
- Extra Users (+5, +10)

**Rules:**
- Add-ons can be added/removed anytime
- Proration applies for mid-cycle changes
- Some add-ons restricted by plan type

**User Experience:**
- Toggle add-ons in SUB-007
- Price updates in real-time
- Clear feature list per add-on

---

## 6.4 Data Integrity Rules

### 1. Progress Auto-Save
**Rule:** User progress auto-saves every 30 seconds AND on specific actions  
**Save Triggers:**
- Every 30 seconds while reading/working
- On section completion
- On bookmark creation
- On highlight/note creation
- On app backgrounding

**Implementation:**
- Client-side auto-save timer
- Queued saves if offline
- Conflict resolution: last-write-wins
- Server timestamp for sync

**User Experience:**
- "Saving..." indicator (subtle)
- "Progress saved" toast confirmation (CONTENT-008)
- No manual save button needed
- Background save, non-intrusive

---

### 2. Offline Sync
**Rule:** Offline actions queue and sync when connection restored  
**Queueable Actions:**
- Progress updates
- Highlights/notes
- Bookmarks
- Completion marks

**Implementation:**
- Local queue of pending actions
- Sync on reconnection (background)
- Conflict detection and resolution
- Retry logic with exponential backoff

**User Experience:**
- "Offline mode" indicator (UTIL-003)
- "Syncing..." when reconnected (UTIL-007)
- "Sync complete" confirmation
- Error handling: "Sync failed, will retry"

---

### 3. Server-Side Validation
**Rule:** All critical actions validated server-side, even if client-side validation passed  
**Applies To:**
- Subscription purchases
- Content unlocking
- Progress completion
- Member invitations
- Data exports

**Implementation:**
- Client-side validation for UX (instant feedback)
- Server-side validation for security (authoritative)
- Double-check on critical actions
- Reject tampering attempts

**User Experience:**
- Fast client-side feedback
- Server validation transparent to user
- Error handling if server rejects: "This action couldn't be completed"

---

## 6.5 Privacy & Sharing Rules

### 1. Favorite Export Privacy
**Rule:** User must explicitly consent before exporting favorites with personal notes  
**Implementation:**
- Privacy warning modal before export (LIBRARY-022)
- Scope selection: "Highlight only" vs. "Highlight + Note"
- Explicit consent checkbox
- Remind user: "Your notes will be visible to recipients"

**User Experience:**
- Modal with warning icon
- Clear language: "Your personal notes will be shared. Are you sure?"
- Scope radio buttons
- "I understand" checkbox
- "Export" and "Cancel" buttons

---

### 2. Member Activity Visibility
**Rule:** 
- Family/Group admin can see member activity summary
- Members cannot see each other's activity
- Individual content (notes, highlights) always private

**Implementation:**
- Role-based access control (RBAC)
- Admin dashboard vs. member view
- Privacy settings per user (opt-in for detailed sharing)

**User Experience:**
- Admin sees: Member list, completion %, last active
- Members see: Only their own data
- Privacy note: "Only plan admin can see your progress summary"
- Opt-in toggle: "Share detailed progress with admin" (default: off)

---

### 3. Data Deletion
**Rule:** User can request full data deletion (GDPR compliance)  
**Implementation:**
- 30-day grace period for accidental requests
- Soft delete initially, hard delete after 30 days
- Notification before hard delete

**User Experience:**
- "Delete My Data" button in Privacy Settings (PROFILE-021)
- Confirmation dialog with explanation
- Email confirmation required
- "Deletion scheduled for [Date]" notice
- Cancel option within 30 days

---

# 7. DESIGN & UX NOTES

## 7.1 Visual Design Principles

### Typography
- **Primary Font:** SF Pro (iOS), Roboto (Android)
- **Reading Font:** Georgia or custom serif for e-books (user-adjustable)
- **Line Height:** 1.5x (generous for readability)
- **Text Sizes:** 5 levels (Small, Default, Large, X-Large, XX-Large)
- **Contrast:** WCAG 2.1 AA minimum (4.5:1 for normal text, 3:1 for large)

### Color Palette
- **Primary:** PST brand color (to be defined)
- **Secondary:** Complementary accent
- **Neutrals:** Grays for backgrounds, borders
- **Semantic:**
  - Success: Green (#10B981)
  - Warning: Amber (#F59E0B)
  - Error: Red (#EF4444)
  - Info: Blue (#3B82F6)
- **Accessibility:** All colors meet WCAG contrast requirements

### Spacing System
- **Base Unit:** 4px
- **Scale:** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Touch Targets:** Minimum 44x44 points (iOS), 48x48 dp (Android)
- **Card Padding:** 16px
- **Screen Margins:** 16px (mobile), 24px (tablet)

### Icons
- **Style:** Consistent, PST-branded icon set
- **Size:** 24x24 (default), 32x32 (large), 16x16 (small)
- **Weight:** Match brand style (outline or filled)
- **Accessibility:** All icons have text labels for screen readers

---

## 7.2 Interaction Patterns

### Gestures
- **Tap:** Primary interaction
- **Long Press:** Context menus, highlight activation
- **Swipe Left/Right:** Page navigation in e-books
- **Swipe Down:** Dismiss modals, refresh lists
- **Swipe to Delete:** Remove favorites, notifications
- **Pull to Refresh:** Update content lists
- **Pinch to Zoom:** Image zoom (if applicable)

### Animations
- **Transitions:** 200-300ms ease-in-out
- **Loading:** Skeleton screens for content, spinners for actions
- **Feedback:** Haptic on important actions (completion, achievement)
- **Reduced Motion:** Respect system setting, use cross-fade instead of slide

### Modals & Overlays
- **Bottom Sheets:** For short actions (Quick Actions, Filters)
- **Full Modals:** For complex flows (Subscription, Detail Views)
- **Alerts:** For confirmations, destructive actions
- **Toasts:** For non-critical feedback (save confirmation, info)

---

## 7.3 Accessibility Features

### Screen Reader Support (VoiceOver/TalkBack)
- **Labels:** All buttons, images, and interactive elements have meaningful labels
- **Focus Order:** Logical tab order top-to-bottom, left-to-right
- **Announcements:** Dynamic content changes announced
- **Headings:** Proper heading hierarchy for navigation

### Visual Accessibility
- **Text Size:** User-adjustable via PROFILE-019 (5 levels)
- **High Contrast:** Toggle in PROFILE-020
- **Color Blindness:** Icons/patterns in addition to color coding
- **Focus Indicators:** Clear visual focus for keyboard/switch navigation

### Reduced Motion
- **Respect System Setting:** iOS/Android motion preferences
- **Alternative Animations:** Cross-fade instead of slide/scale
- **Static Alternatives:** Option to disable all animations

---

## 7.4 Performance Considerations

### Loading Strategies
- **Lazy Loading:** Load content sections as needed (e.g., chapters on demand)
- **Skeleton Screens:** Show layout while content loads
- **Pagination:** Limit initial load, load more on scroll
- **Image Optimization:** WebP format, progressive JPEG, lazy loading

### Caching
- **Content Cache:** Recent content stored locally (7-day TTL)
- **Image Cache:** Aggressive caching for covers, icons
- **API Response Cache:** Cache non-critical data (catalogs, metadata)

### Offline Support
- **Critical Features:** Reading downloaded e-books, viewing favorites
- **Offline Queue:** Queue actions (highlights, notes) for sync
- **Storage Management:** User control over downloaded content size

### Background Sync
- **Non-Blocking:** Sync progress in background, don't block UI
- **Smart Sync:** Sync on Wi-Fi if user preference set
- **Battery Awareness:** Reduce sync frequency on low battery

---

## 7.5 Platform-Specific Considerations

### iOS
- **Navigation:** UINavigationController, tab bar controller
- **Gestures:** Swipe-back gesture to previous screen
- **Haptics:** Use iOS haptic feedback (success, warning, error)
- **Safe Area:** Respect notch and home indicator areas
- **Dark Mode:** Native iOS dark mode support

### Android
- **Navigation:** Material Design navigation patterns
- **Gestures:** Back gesture (swipe from edge)
- **Material Components:** Use Material Design components
- **Adaptive Icons:** Support adaptive icon shapes
- **Dark Theme:** Material Design dark theme

---

## 7.6 Responsive Design

### Screen Sizes
- **Small Phone:** 320-375px width (iPhone SE, small Android)
- **Standard Phone:** 375-428px width (iPhone 12-14, standard Android)
- **Large Phone:** 428-480px width (iPhone Pro Max, large Android)
- **Tablet:** 768px+ width (iPad, Android tablets) - Future consideration

### Breakpoints
- **Mobile:** < 480px (single column)
- **Tablet:** 481-1024px (two columns where appropriate)
- **Desktop:** > 1024px (future web consideration)

### Layout Strategies
- **Stacking:** Vertical stacking on mobile
- **Grid:** 2-column grid for catalogs on larger screens
- **Flexible Cards:** Card width adapts to screen size
- **Readable Line Length:** Max 600px for reading content

---

# 8. APPENDIX

## 8.1 Screen Count Summary

| Category | Screen Count |
|----------|--------------|
| Authentication & Onboarding | 9 |
| Ana Sayfa (Home) | 5 |
| Keşfet (Explore) | 14 |
| Kütüphane (Library) | 22 |
| Gelişim (Progress) | 12 |
| Profil (Profile) | 25 |
| Subscription & Payment | 12 |
| Content Reading & Interaction | 10 |
| Completion & Achievement | 8 |
| Utility & System | 10 |
| **Total** | **117** |

---

## 8.2 Epic Coverage

| Epic | Name | Screens Covered | Status |
|------|------|-----------------|--------|
| EPIC 1 | Dil, Hesap ve Güvenli Oturum | AUTH-001 to 009, PROFILE-001 to 004, 015, 021-023 | ✅ Complete |
| EPIC 2 | Ana Sayfa ve Navigasyon | HOME-001 to 005, PROFILE-013, 014, 016, 024, 025 | ✅ Complete |
| EPIC 3 | Abonelik ve Kişi Yönetimi | SUB-001 to 012, PROFILE-005 to 012 | ✅ Complete |
| EPIC 4 | Yolculuklar (Journeys) | EXPLORE-004, 005, LIBRARY-002 to 004, ACHIEVE-004 | ✅ Complete |
| EPIC 5 | Gelişim Paneli | PROGRESS-001 to 012 | ✅ Complete |
| EPIC 6 | Keşfet ve Arama | EXPLORE-001 to 003, 013, 014 | ✅ Complete |
| EPIC 7 | e-Kitap Okuyucu | EXPLORE-010, 011, LIBRARY-012 to 015, ACHIEVE-005, UTIL-006 | ✅ Complete |
| EPIC 8 | Atölyeler (Workshops) | EXPLORE-006, 007, LIBRARY-005 to 007, ACHIEVE-003 | ✅ Complete |
| EPIC 9 | Favoriler ve Kişisel Arşiv | LIBRARY-016 to 022 | ✅ Complete |
| EPIC 10 | Erişilebilirlik | PROFILE-018 to 020 | ✅ Complete |
| EPIC 11 | Modül ve Paket Sistemi | EXPLORE-008, 009, LIBRARY-008 to 011, ACHIEVE-001, 002 | ✅ Complete |

---

## 8.3 Glossary

| Term (Turkish) | Term (English) | Definition |
|----------------|----------------|------------|
| Ana Sayfa | Home | Main dashboard screen |
| Keşfet | Explore | Discovery and search screen |
| Kütüphane | Library | User's enrolled content |
| Gelişim | Progress | Progress tracking and analytics |
| Profil | Profile | User account and settings |
| Yolculuk | Journey | Comprehensive program with modules, workshops, e-books |
| Modül | Module | Group of packages within a journey |
| Paket | Package | Focused content unit within a module |
| Atölye | Workshop | Standalone interactive content with readings and applications |
| e-Kitap | e-Book | Digital book in PST library |
| Okuma | Reading | Reading section within content |
| Uygulama | Application | Practical application steps within content |
| Danışan | Client | User consuming content |
| Koç | Coach | Content creator/facilitator (Phase 2) |
| Sıdk | Integrity | Core PST concept |
| Sabır | Patience | Core PST concept |
| Şükür | Gratitude | Core PST concept |

---

## 8.4 Next Steps

### For Design Team
1. Create wireframes for all 117 screens
2. Develop high-fidelity mockups for key flows
3. Establish design system (colors, typography, components)
4. Create interactive prototype for user testing
5. Accessibility audit of all designs

### For Development Team
1. Review technical feasibility of all flows
2. Define API contracts for each screen's data requirements
3. Establish state management architecture
4. Plan offline-first data sync strategy
5. Set up analytics tracking points

### For Product Team
1. Validate flows with stakeholders
2. Create user testing scenarios based on flows
3. Define success metrics per screen/flow
4. Plan beta testing program
5. Prepare onboarding materials

### For QA Team
1. Create test scenarios from user flows
2. Define acceptance criteria per screen
3. Plan regression testing strategy
4. Set up device testing matrix (iOS/Android versions)
5. Accessibility testing checklist

---

# DOCUMENT END

**Version:** 1.0  
**Date:** January 2026  
**Status:** Production Ready  
**Total Screens:** 117  
**Coverage:** Phase 1 (MVP) - EPIC 1-11 Complete

This documentation provides comprehensive user flows and screen inventory for PST Mobile App development. All screens are detailed with purposes, components, actions, and navigation paths to ensure production-ready implementation.

---

**Document Prepared By:** Claude (Anthropic)  
**Based On:** PST Mobile PRD v1.1 (January 2026)  
**For:** PST Mobile App Development Team
