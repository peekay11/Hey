# "Hey" App — Product Spec

A community app where every post is a question, request, or recommendation, starting with "Hey". Mix of local chat + local discovery.

---

## 1. Post Component

Every post has:

| Field | Description |
|---|---|
| **Author** | Username + avatar |
| **Text** | Must start with "Hey" (e.g. "Hey, any good barber in Soweto?") |
| **Location tag** | e.g. Soweto, Braamfontein — powers local search |
| **Category tag** | e.g. Photographer, Barber, Gym, Food, Sneakers |
| **Timestamp** | "2h ago" |
| **Upvotes** | Total on the post itself |
| **Reply count** | Number of replies |
| **Status** | Open / Answered (auto-marks "Answered" once a reply is marked Helpful) |
| **Boost flag** | Optional — paid or algorithmic push for more visibility |

---

## 2. Reply Component

Every reply has:

| Field | Description |
|---|---|
| **Author** | Username + avatar |
| **Text** | The actual answer/recommendation |
| **Tagged business/service** | Optional — link a name, contact, or profile (e.g. "@ThandoPhotography") |
| **Upvotes** | Other users can upvote a helpful reply |
| **Mark as Helpful** | Only the original poster can mark one reply as the accepted answer |
| **Timestamp** | When it was posted |

Sorting order for replies: **Marked Helpful → Most Upvoted → Newest**

---

## 3. Core Interactions

- **Upvote a post** — signals "I want to know this too"
- **Upvote a reply** — signals "this is a good answer"
- **Mark Helpful** — poster confirms the best answer (closes the post)
- **Boost a post** — increase visibility (self-boost or paid)
- **Tag a business** — attach a service/profile to a reply
- **Follow a location** — get notified of new posts tagged with that area
- **Follow a category** — e.g. follow "Photography" to see all related posts

---

## 4. Local Search / Discovery

- Filter posts by **location** (suburb/area) and **category**
- "Nearby" feed — shows recent posts near the user
- Search bar — search past posts/answers (so repeat questions surface old answers instantly)
- Tag-based business directory — auto-built from tagged replies over time

---

## 5. Post Lifecycle

1. User posts a "Hey" question
2. Others reply with answers/tags
3. Replies get upvoted
4. Poster marks one reply as Helpful → post status = **Answered**
5. Answered posts stay searchable for future users with the same question

---

## 6. Why It Works

- Low barrier to post (just ask a question)
- Built-in incentive to reply (visibility + promotion for local services)
- Local search turns casual chat into a discovery/directory tool over time
- Constant activity without needing polished content




