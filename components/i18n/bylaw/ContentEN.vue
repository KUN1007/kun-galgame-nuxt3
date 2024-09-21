<script setup lang="ts"></script>

<template>
  <div class="article">
    <div class="title">Regulations (Trial)</div>
    <div class="tips">
      <p>
        These are trial regulations, ✔ indicating implementation. The aim is to
        make the forum's operation more transparent.
      </p>
    </div>

    <div class="moemoepoint">
      <h2>MoeMoe Points</h2>
      <div class="gain">
        <h3>Ways to Earn</h3>
        <ul>
          <li>Each registered user starts with 1007 MoeMoe Points ✔</li>
          <li>
            Daily check-in earns 0 to 7 random MoeMoe Points, refreshed at
            midnight ✔
          </li>
          <li>
            If a topic receives a reply, the topic creator earns 2 MoeMoe Points
            ✔
          </li>
          <li>
            If a topic is promoted, the topic creator earns 3 MoeMoe Points ✔
          </li>
          <li>
            If a topic is bookmarked, the topic creator earns 1 MoeMoe Point ✔
          </li>
          <li>
            If a reply receives a comment, the reply creator earns 1 MoeMoe
            Point ✔
          </li>
          <li>
            If a reply is promoted, the reply creator earns 1 MoeMoe Point ✔
          </li>
          <li>
            If a user's topic/reply/comment is liked, the user earns 1 MoeMoe
            Point ✔
          </li>
          <li>Publishing a visual novel earns 3 MoeMoe Points ✔</li>
          <li>
            If a published visual novel is liked, commented on, or bookmarked,
            the publisher earns 1 MoeMoe Point ✔
          </li>
          <li>Publishing a visual novel resource earns 3 MoeMoe Points ✔</li>
          <li>
            If a visual novel merge request is accepted, the requester earns 1
            MoeMoe Point ✔
          </li>
          <li>
            If a visual novel resource is liked, the publisher earns 1 MoeMoe
            Point ✔
          </li>
          <li>
            If a visual novel comment receives a reply, the commenter earns 1
            MoeMoe Point ✔
          </li>
        </ul>
      </div>
      <div class="deduct">
        <h3>Ways to Lose</h3>
        <ul>
          <li>
            Users' non-moe behavior will result in deductions of 7, 17, 77, 177,
            or 777 MoeMoe Points based on the severity.
          </li>
          <li>
            Each topic downvoted 10 times, if verified, results in a deduction
            of 100 MoeMoe Points.
          </li>
          <li>
            Users promoting a topic will be deducted 7 MoeMoe Points per
            promotion, and can promote multiple times ✔
          </li>
          <li>
            Users promoting a reply will be deducted 2 MoeMoe Points per
            promotion, and can promote multiple times ✔
          </li>
        </ul>
      </div>
    </div>

    <div class="kungalgamer">
      <h2>Users</h2>
      <ul>
        <li>
          <strong>
            1. Users with less than 1000 moemoepoints will have their accounts
            deleted
          </strong>
        </li>
        <li>
          2. Users with less than 1100 moemoepoints cannot use the "Promote
          Topic" feature ✔
        </li>
        <li>
          3. Users will be deleted if they receive 10 consecutive dislikes (We
          hope for less criticism and more praise)
        </li>
      </ul>
    </div>

    <div class="topic">
      <h2>Topics</h2>
      <ul>
        <li>
          1. Each topic on the homepage is in "Dynamic Promotion" status. Once
          influenced by actions like "likes," "comments," or "topic promotion,"
          it will be pinned ✔
        </li>
        <li>
          2. Topic popularity calculation formula: Popularity = Views × 0.1 +
          Comments × 2 + Likes × 2 + Topic Upvotes × 50 – Dislikes × 5 ✔
        </li>
        <li>
          3. Topics promoted within 10 hours will receive a "Glowing" style ✔
        </li>
        <li>
          4. Once a single topic receives 10 dislikes, it will be automatically
          blocked by the system and subject to manual review
        </li>
        <li>
          5. Every night at 12:00, the topic pool will be cleared, leaving the
          top 17 topics with the highest popularity values from the previous
          day. If popularity values are tied, all will be promoted
        </li>
      </ul>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<style lang="scss" scoped>
.article {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 30px;
  margin: 17px 0;
  display: flex;
  justify-content: center;
}

.tips {
  border-top: 2px solid var(--kungalgame-blue-5);
  padding-top: 10px;

  span {
    cursor: pointer;
    border-bottom: 1px solid var(--kungalgame-blue-5);

    a {
      color: var(--kungalgame-blue-5);
    }
  }
}

h2 {
  margin-top: 30px;
  margin-bottom: 17px;
}

.moemoepoint ul {
  li {
    margin: 5px 0;
  }
}

.kungalgamer > ul {
  li {
    margin: 5px 0;
  }
}

.topic > ul {
  li {
    margin: 5px 0;
  }
}
</style>
