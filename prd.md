# Product Requirements Document (PRD)
## Top-Up & Withdraw Management System

**Version:** 1.0  
**Date:** March 22, 2026  
**Status:** Draft Finalized  
**Prepared For:** Product, Design, Frontend, Backend, and Admin Panel Development Teams

---

# 1. Product Overview

## 1.1 Product Name
Top-Up & Withdraw Management System

## 1.2 Product Summary
This product is a real-time mobile app and admin panel system for managing player game access, top-up requests, and withdraw requests.

Players will use the mobile app to:
- sign up and manage their profile
- view assigned game credentials
- request top-ups
- request withdrawals
- check order history and statuses
- access support, promotions, and announcements

Admins and staff/agents will use the admin panel to:
- manage games and payment methods
- assign game credentials to players
- process top-up and withdraw requests live
- update request statuses
- enforce withdraw rules
- monitor logs and staff activity
- view operational dashboards and reports

---

# 2. Problem Statement

Current operations for top-up and withdraw handling are manual, fragmented, and difficult to track. Staff need a single live system where:
- player requests appear instantly
- statuses can be updated without confusion
- user game credentials can be assigned and managed
- admins can monitor all staff activity
- top-up and withdraw workflows can be controlled dynamically

The system must reduce operational friction, improve transparency, and support future scaling.

---

# 3. Goals and Objectives

## 3.1 Primary Goals
- Create a smooth player-facing top-up and withdraw experience
- Provide a live admin panel for staff processing
- Enable admins to dynamically manage games, payment methods, and limits
- Ensure every order and staff action is trackable
- Keep the system simple, fast, and mobile friendly

## 3.2 Secondary Goals
- Improve customer trust with visible statuses and order history
- Support marketing through home-page promos and events
- Build a scalable foundation for future automation and notifications

## 3.3 Success Criteria
- Players can complete top-up and withdraw flows without support intervention
- Staff can process requests in real time without page refresh
- Admin can search all requests by order number
- Admin can see full logs of staff actions
- Dynamic game/payment configuration works without code changes

---

# 4. Product Scope

## 4.1 In Scope
- Mobile app for players
- Web admin panel for admin and staff
- Top-up workflow
- Withdraw workflow
- Game management
- Payment method management
- User game credential assignment
- Profile management
- Support and FAQ section
- Home promotions/events section
- Live request updates
- Audit logs
- Dashboard analytics
- Order history
- Role-based access control

## 4.2 Out of Scope for Phase 1
- automated payment verification
- in-app live chat support
- deep fraud detection engine
- staff commission calculation
- advanced financial accounting
- multi-language support unless added later
- direct social login unless specifically requested

---

# 5. User Roles

## 5.1 Player
A registered user of the mobile app who can view assigned game details, request top-up, and request withdrawal.

## 5.2 Staff / Agent
An operational user who processes top-up and withdraw requests, manages assigned operational entries, and updates statuses.

## 5.3 Admin
A high-privilege user who manages the whole platform, including staff, settings, games, payment methods, limits, dashboards, and logs.

---

# 6. User Personas

## 6.1 Player Persona
A game player who wants:
- quick access to their game credentials
- a simple way to top up
- a clear withdraw process
- transparency on status and history

## 6.2 Staff Persona
An operations team member who wants:
- instant visibility of incoming requests
- easy filtering and status updates
- access to user details and recent histories
- minimal manual refresh or repetitive effort

## 6.3 Admin Persona
A business owner or senior operator who wants:
- visibility into total operations
- dynamic control over products and payment methods
- full accountability of staff actions
- the ability to monitor system health and operational performance

---

# 7. Core User Journeys

## 7.1 Player Top-Up Journey
1. Player signs in
2. Opens Top Up section
3. Sees available games
4. Selects a game
5. Views assigned username/password and download link
6. Clicks **Top Up This Game**
7. Chooses payment method
8. Enters top-up amount
9. Sees QR code and payment tag
10. Sends payment externally
11. Clicks **Payment Sent**
12. Top-up request is created with status `Processing`
13. Staff updates request
14. Player sees final status in history

## 7.2 Player Withdraw Journey
1. Player signs in
2. Opens Withdraw section
3. Sees withdraw rules and limits
4. Enters amount
5. System validates eligibility
6. If eligible, player selects preferred payment method
7. Player enters payout tag
8. Submits withdraw request
9. Request is created
10. Staff processes request
11. Player sees status updates in history

## 7.3 Staff Processing Journey
1. Staff logs into admin panel
2. Sees live pending requests
3. Opens request detail
4. Reviews player, amount, method, and history
5. Performs real-world operation
6. Updates status
7. Action is logged automatically

## 7.4 Admin Management Journey
1. Admin logs in
2. Views dashboard KPIs
3. Manages games/payment methods/users/staff
4. Adjusts withdraw limits
5. Searches orders
6. Monitors logs of staff actions

---

# 8. Functional Requirements

# 8.1 Authentication and Access Control

## Description
The system must support secure login and role-based access.

## Requirements
- Players can sign up and log in via mobile app
- Staff and admin log in via admin panel
- Role-based permissions must be enforced
- Users must only access allowed screens and data

## Acceptance Criteria
- Player cannot access admin screens
- Staff cannot access admin-only settings unless permitted
- Admin has full access
- Sessions must persist securely until logout or expiry

---

# 8.2 Player Mobile App Navigation

## Bottom Navigation Structure
- Home
- Top Up
- Withdraw
- Support
- Profile

## Acceptance Criteria
- All navigation items are visible to logged-in players
- Navigation switches screens without breaking session state
- Current page indicator is visible

---

# 8.3 Home Module

## Description
The Home screen provides engagement content and announcements.

## Features
- promotions
- events
- banners
- quote of the day
- announcements

## Admin Controls
- add content
- edit content
- remove content
- activate/deactivate content

## Acceptance Criteria
- Home content loads dynamically from backend
- Inactive content does not display
- Latest active content appears without app update

---

# 8.4 Game Management Module

## Description
Games are dynamic items that can be added or removed by admin.

## Game Fields
- id
- name
- image
- download link
- description (optional)
- active status
- sort order
- created_at
- updated_at

## Admin Functions
- create game
- edit game
- deactivate game
- delete game if allowed by policy
- reorder games

## Acceptance Criteria
- New game appears in player app when active
- Inactive game is hidden from players
- Game image and download link display correctly

---

# 8.5 User Game Credential Assignment

## Description
Each player can be assigned game-specific credentials from backend.

## Credential Fields
- user_id
- game_id
- game_username
- game_password
- assigned_by
- assigned_at
- updated_at

## Staff/Admin Functions
- search user
- select game
- assign username/password
- update username/password later
- view assignment history if required

## Player Experience
On each game detail page, the player sees:
- assigned username
- assigned password
- download link
- recent top-up history for that game

## Acceptance Criteria
- Credentials are only visible to assigned user
- Staff/admin can assign one game at a time
- Updated credentials reflect correctly in player app

---

# 8.6 Top-Up Module

## 8.6.1 Top-Up Game List
Players can see all active games in the Top Up section.

## Acceptance Criteria
- Only active games appear
- Each game card shows at minimum name and image
- Clicking a game opens the game detail page

## 8.6.2 Game Detail Page
Each game page shows:
- game image
- game name
- assigned username
- assigned password
- download link
- button: `Top Up This Game`
- recent history for this game

## Acceptance Criteria
- If no credentials are assigned, a fallback message is shown
- Top-up button is visible when game is active
- Recent game-specific history shows latest entries first

## 8.6.3 Payment Method Selection
Payment methods are dynamic and managed from backend.

### Payment Method Fields
- id
- name
- qr_image
- payment_tag
- active status
- display order
- created_by
- updated_by

### Requirements
- methods such as Chime and Cash App can be added
- tag and QR can be edited manually from backend
- methods can be activated or deactivated

## Acceptance Criteria
- Only active methods appear to player
- Selected method determines shown QR and tag
- Copy action is available for tag

## 8.6.4 Top-Up Request Form
Player selects:
- game
- payment method
- amount

After amount entry, system shows:
- receiver QR
- receiver payment tag
- copy option

Player then clicks `Payment Sent`.

## Top-Up Order Fields
- id
- order_number
- user_id
- game_id
- payment_method_id
- amount
- status
- created_at
- updated_at
- processed_by
- notes (optional)

## Initial Status
`Processing`

## Suggested Statuses
- Processing
- Verified
- Completed
- Rejected
- Cancelled

## Acceptance Criteria
- Clicking `Payment Sent` creates order successfully
- Order number is unique
- Player sees request immediately in history
- Staff sees request instantly in admin panel

---

# 8.7 Withdraw Module

## 8.7.1 Withdraw Settings
Admin configures:
- minimum withdraw amount
- maximum withdraw amount
- eligibility rules
- optional daily/period restrictions in future

## Acceptance Criteria
- New limits apply without app release
- Limits display correctly to player

## 8.7.2 Withdraw Eligibility Validation
System must validate if player can request a withdraw.

### Current Business Rule Direction
A player should not be allowed to withdraw above allowed logic derived from their top-up behavior and system rules.

### Example
- top-up total or eligible value = 10
- requested withdraw = 20
- request should be blocked if rule disallows it

## Validation Output
If ineligible, system shows a human-friendly explanation.

## Acceptance Criteria
- Validation runs before request is created
- Ineligible requests are not submitted
- Clear reason is shown to player

## 8.7.3 Withdraw Form
Player enters:
- withdraw amount
- preferred payment method
- payout tag

## Withdraw Order Fields
- id
- order_number
- user_id
- amount
- payment_method_id
- payout_tag
- status
- eligibility_snapshot
- created_at
- updated_at
- processed_by
- notes (optional)

## Suggested Statuses
- Pending
- Processing
- Paid
- Rejected
- Cancelled

## Acceptance Criteria
- Eligible submission creates withdraw order
- Order is visible in player history
- Staff sees request instantly in admin panel

---

# 8.8 Support Module

## Description
Support section provides help resources and a customer care redirect.

## Features
- FAQs
- customer care button

## Customer Care Action
- redirects player to a Facebook customer care page

## Admin Controls
- manage FAQ entries
- update customer care link

## Acceptance Criteria
- FAQ loads dynamically
- Customer care button opens configured link
- Link can be changed from backend

---

# 8.9 Profile Module

## Description
Player profile page stores personal details collected during signup and later editing.

## Profile Fields
Suggested:
- profile image
- full name
- app username
- phone
- email (optional)
- password
- created_at
- updated_at

## Acceptance Criteria
- Player can view profile info
- Player can update allowed fields
- Profile image displays correctly

---

# 8.10 Order History

## Description
Players need visibility into their top-up and withdraw requests.

## Features
- all order history or separated tabs
- request type
- amount
- game if top-up
- status
- created date
- order number

## Acceptance Criteria
- Player sees only their own history
- Status updates are reflected accurately
- History is sorted by newest first

---

# 8.11 Admin Dashboard

## Description
Admin dashboard provides operational overview.

## Metrics
- total top-up orders
- total withdraw orders
- pending requests
- completed requests
- monthly totals
- active users
- active games
- active staff

## Optional Visuals
- monthly top-up trend chart
- monthly withdraw trend chart
- status distribution

## Acceptance Criteria
- Dashboard loads current values from backend
- Counts reflect filters/date logic correctly
- Pending requests are prominently visible

---

# 8.12 Orders Management

## Description
All requests must be searchable and manageable.

## Features
- unified order view or split views
- search by order number
- filter by type
- filter by status
- filter by date
- filter by player
- filter by game
- filter by staff
- recent pending items at top

## Acceptance Criteria
- Searching by exact order number returns correct order
- Filters can be combined
- Pending orders appear quickly and clearly

---

# 8.13 Dedicated Top-Up Queue

## Description
A separate page for all top-up requests.

## Features
- live queue
- request detail
- update status
- view user details
- view game details
- view payment method
- view amount
- recent history shortcut

## Acceptance Criteria
- New top-up requests appear without refresh
- Staff can update status from list or detail page
- Changes reflect in player app

---

# 8.14 Dedicated Withdraw Queue

## Description
A separate page for all withdraw requests.

## Features
- live queue
- request detail
- update status
- view payout method
- view payout tag
- view amount
- view recent order history button

## Acceptance Criteria
- New withdraw requests appear without refresh
- Staff can open player history from request
- Final status reflects to player

---

# 8.15 Staff Management

## Description
Admin manages internal operational users.

## Features
- create staff account
- deactivate staff account
- assign role
- limit permissions if needed

## Acceptance Criteria
- Admin can create and disable staff accounts
- Disabled staff cannot access panel
- Role is enforced at login and API level

---

# 8.16 Audit Logs / Activity Tracking

## Description
Every meaningful admin/staff action must be logged.

## Log Fields
- id
- actor_user_id
- actor_name
- actor_role
- action_type
- target_type
- target_id
- description
- old_value
- new_value
- created_at

## Sample Logged Actions
- updated top-up order status
- updated withdraw order status
- assigned game credentials
- changed payment tag
- changed QR
- added game
- edited game
- changed withdraw limits
- created/deactivated staff

## Acceptance Criteria
- Admin can search and filter logs
- Logs cannot be modified by staff
- Every tracked action includes actor and timestamp

---

# 8.17 Real-Time Updates

## Description
The system must operate live without repeated manual refresh.

## Real-Time Events
- new top-up request created
- new withdraw request created
- status changed
- dashboard pending counts updated
- player order history updated

## Acceptance Criteria
- Staff queue updates automatically
- Player sees changed statuses without long delay
- Pending counts update in near real time

---

# 9. User Stories

## 9.1 Player Stories
- As a player, I want to sign up so I can access the app.
- As a player, I want to view the games available for top-up.
- As a player, I want to see my assigned game username and password.
- As a player, I want to see a download link for my game.
- As a player, I want to choose a payment method for top-up.
- As a player, I want to copy the payment tag easily.
- As a player, I want to submit a top-up request after sending payment.
- As a player, I want to request a withdraw using my preferred payout method.
- As a player, I want to know why my withdraw is blocked.
- As a player, I want to see my order history and statuses.
- As a player, I want to view support FAQs and contact customer care.
- As a player, I want to edit my profile details.

## 9.2 Staff Stories
- As a staff member, I want to see new top-up requests live.
- As a staff member, I want to see new withdraw requests live.
- As a staff member, I want to update request statuses.
- As a staff member, I want to view player details and recent order history.
- As a staff member, I want to assign game credentials to players.
- As a staff member, I want my actions recorded for transparency.

## 9.3 Admin Stories
- As an admin, I want to see total counts and pending items on a dashboard.
- As an admin, I want to add or remove games dynamically.
- As an admin, I want to manage payment methods, QR codes, and tags.
- As an admin, I want to set withdraw minimum and maximum values.
- As an admin, I want to manage staff accounts and permissions.
- As an admin, I want to search orders by order number.
- As an admin, I want to see who changed what in the system.

---

# 10. Acceptance Criteria Summary by Module

## Authentication
- secure login works for each role
- role restrictions enforced

## Home
- dynamic content appears correctly
- inactive content hidden

## Games
- active games visible to players
- admin can create/edit/deactivate

## Game Credentials
- assigned user sees correct credentials
- staff/admin can update credentials

## Top-Up
- request created after payment confirmation
- order number unique
- staff sees request live

## Withdraw
- system enforces min/max and eligibility
- valid request creates order
- invalid request explains reason

## Support
- FAQs editable from backend
- customer care button redirects correctly

## Orders
- searchable by order number
- filterable by type/status/date/user

## Logs
- all critical actions logged
- admin can inspect logs

## Real-Time
- queues and statuses update without manual refresh

---

# 11. Non-Functional Requirements

## 11.1 Performance
- app screens should load quickly on normal mobile connections
- admin lists should support pagination for large data
- real-time updates should be near instant

## 11.2 Security
- passwords must be stored securely
- role-based access enforced server-side
- sensitive game credentials protected in transit and at rest
- audit logs tamper-resistant for normal users

## 11.3 Availability
- system should support day-to-day operational usage with minimal downtime

## 11.4 Scalability
- should support adding more games and payment methods without code redesign
- architecture should support growing order volume

## 11.5 Usability
- simple form flows
- copy-to-clipboard for tags
- clear button labels and status labels
- mobile-friendly interface

## 11.6 Maintainability
- clean modular backend
- clean admin APIs
- reusable components in frontend and admin panel

---

# 12. Business Rules

## Top-Up Rules
- only active games can be topped up
- only active payment methods can be used
- top-up request is created only when player confirms payment sent
- initial status is `Processing`

## Withdraw Rules
- admin-defined min and max limits apply
- eligibility logic must pass before request submission
- user must see explanation if blocked
- withdraw orders have unique order numbers separate from top-up orders

## Credential Rules
- game credentials are user-specific
- one user may have multiple games assigned if needed
- credentials are manually entered from backend

## Logging Rules
- all critical admin/staff actions must be logged
- logs must include actor and timestamp

---

# 13. Data Model / Core Entities

## 13.1 User
- id
- role (`player`, `staff`, `admin`)
- full_name
- username
- email
- phone
- password_hash
- profile_image_url
- status
- created_at
- updated_at

## 13.2 Game
- id
- name
- image_url
- download_link
- is_active
- sort_order
- created_at
- updated_at

## 13.3 UserGameCredential
- id
- user_id
- game_id
- game_username
- game_password_encrypted
- assigned_by
- assigned_at
- updated_at

## 13.4 PaymentMethod
- id
- name
- qr_image_url
- payment_tag
- is_active
- sort_order
- created_at
- updated_at

## 13.5 TopUpOrder
- id
- order_number
- user_id
- game_id
- payment_method_id
- amount
- status
- processed_by
- notes
- created_at
- updated_at

## 13.6 WithdrawOrder
- id
- order_number
- user_id
- payment_method_id
- payout_tag
- amount
- status
- eligibility_snapshot
- processed_by
- notes
- created_at
- updated_at

## 13.7 HomeContent
- id
- type (`promo`, `event`, `announcement`, `quote`)
- title
- body
- image_url
- is_active
- start_at
- end_at
- created_at
- updated_at

## 13.8 FAQ
- id
- question
- answer
- is_active
- sort_order
- created_at
- updated_at

## 13.9 Settings
- id
- key
- value
- updated_by
- updated_at

## 13.10 AuditLog
- id
- actor_user_id
- actor_role
- action_type
- target_type
- target_id
- description
- old_value_json
- new_value_json
- created_at

---

# 14. Suggested API Modules

## 14.1 Auth APIs
- POST /auth/signup
- POST /auth/login
- POST /auth/logout
- GET /auth/me

## 14.2 Profile APIs
- GET /profile
- PUT /profile
- POST /profile/image

## 14.3 Home APIs
- GET /home/content

## 14.4 Game APIs
- GET /games
- GET /games/{id}
- POST /admin/games
- PUT /admin/games/{id}
- DELETE /admin/games/{id}
- PATCH /admin/games/{id}/status

## 14.5 User Game Credential APIs
- GET /games/{id}/my-credentials
- GET /admin/users/{userId}/game-credentials
- POST /admin/users/{userId}/game-credentials
- PUT /admin/users/{userId}/game-credentials/{credentialId}

## 14.6 Payment Method APIs
- GET /payment-methods
- POST /admin/payment-methods
- PUT /admin/payment-methods/{id}
- DELETE /admin/payment-methods/{id}
- PATCH /admin/payment-methods/{id}/status

## 14.7 Top-Up APIs
- POST /topups
- GET /topups/my
- GET /admin/topups
- GET /admin/topups/{id}
- PATCH /admin/topups/{id}/status

## 14.8 Withdraw APIs
- GET /withdraw/settings
- POST /withdraws/validate
- POST /withdraws
- GET /withdraws/my
- GET /admin/withdraws
- GET /admin/withdraws/{id}
- PATCH /admin/withdraws/{id}/status

## 14.9 Support APIs
- GET /faqs
- GET /support/link
- POST /admin/faqs
- PUT /admin/faqs/{id}
- DELETE /admin/faqs/{id}
- PUT /admin/support/link

## 14.10 Dashboard APIs
- GET /admin/dashboard/summary
- GET /admin/dashboard/charts

## 14.11 Order Search APIs
- GET /admin/orders/search?order_number=
- GET /admin/orders/history?user_id=

## 14.12 Staff APIs
- GET /admin/staff
- POST /admin/staff
- PUT /admin/staff/{id}
- PATCH /admin/staff/{id}/status

## 14.13 Logs APIs
- GET /admin/logs

## 14.14 Settings APIs
- GET /admin/settings
- PUT /admin/settings/withdraw-limits
- PUT /admin/settings/general

---

# 15. Permissions Matrix

| Module | Player | Staff | Admin |
|---|---|---|---|
| View home content | Yes | No | Yes |
| View games | Yes | Yes | Yes |
| View own game credentials | Yes | No | Yes |
| Assign game credentials | No | Yes | Yes |
| Create top-up request | Yes | No | Yes |
| Create withdraw request | Yes | No | Yes |
| View own history | Yes | Yes (as support lookup if permitted) | Yes |
| Update top-up status | No | Yes | Yes |
| Update withdraw status | No | Yes | Yes |
| Manage games | No | No or limited | Yes |
| Manage payment methods | No | Limited or Yes if allowed | Yes |
| Manage withdraw limits | No | No | Yes |
| View logs | No | No | Yes |
| Manage staff | No | No | Yes |

---

# 16. Reporting and Analytics

## Operational Reports
- total top-up volume by day/month
- total withdraw volume by day/month
- pending vs completed counts
- per-game order counts
- per-payment-method usage
- per-staff action counts

## Phase 1 Requirement
Basic dashboard counts and trend charts are enough.

---

# 17. Edge Cases

- user has no assigned credentials for a game
- payment method becomes inactive after player opens form
- top-up submitted twice accidentally
- withdraw request exceeds current max after limits change
- staff updates same order at same time as another staff
- deleted/inactive game still has historical orders
- payment tag changed after old request was created
- network disconnect during submission

---

# 18. Risks and Considerations

## Operational Risks
- incorrect manual status updates
- incorrect credential assignment
- inconsistent withdraw policy unless rule is clearly defined

## Technical Risks
- real-time sync issues
- concurrency conflicts on same order
- security around stored credentials

## Product Risks
- unclear withdraw eligibility can create support burden
- too much staff permission can create mistakes
- insufficient logs reduce accountability

---

# 19. Open Decisions Before Build

These should be finalized during solution design:

1. exact withdraw eligibility formula
2. final signup fields
3. whether staff can manage payment methods or only admin
4. whether player history is combined or split by tabs
5. whether payment proof screenshot upload is needed later
6. whether game credentials should be masked by default with reveal action
7. final list of order statuses
8. whether agents can only process assigned requests or all requests

---

# 20. Recommended Tech Direction

## Mobile App
- React Native

## Admin Panel
- React web app

## Backend
- Spring Boot or Node.js backend depending final architecture choice
- real-time updates via WebSocket or similar live event system

## Storage
- relational database preferred due to transactional workflows

## Media Storage
- cloud storage for game images, QR codes, banners, and profile images

---

# 21. Phased Delivery Plan

## Phase 1
- authentication
- player app navigation
- home content
- game management
- payment method management
- user game credentials
- top-up workflow
- withdraw workflow
- order history
- admin dashboard basics
- logs
- real-time queues

## Phase 2
- push notifications
- payment proof upload
- improved reporting
- better support features
- advanced validation and fraud controls

---

# 22. Final Summary

The Top-Up & Withdraw Management System is a real-time operational platform with:
- a player mobile app
- an admin/staff web panel
- dynamic games and payment methods
- assigned game credentials per user
- structured top-up and withdraw flows
- live status updates
- order history and searchability
- strong admin visibility through logs and dashboards

This PRD is intended to guide design, backend architecture, frontend development, QA, and deployment planning.