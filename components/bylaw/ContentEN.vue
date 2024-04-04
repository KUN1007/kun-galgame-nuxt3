<script setup lang="ts"></script>

<template>
  <div class="article">
    <div class="title">Regulations (Trial)</div>
    <div class="tips">
      <p>
        Tips: These are trial regulations, ✔ indicating implementation. The aim
        is to make the forum's operation more transparent. It's not about rules;
        we
        <span>
          <NuxtLinkLocale to="/kungalgame">have no rules</NuxtLinkLocale>
        </span>
      </p>
    </div>

    <div class="moemoepoint">
      <h2>Moemoepoints</h2>

      <div class="gain">
        <h3>Acquisition Methods</h3>
        <ul>
          <li>1. Each registered user initially has 1007 moemoepoints ✔</li>
          <li>
            2. Gain random 0 to 7 moemoepoints daily upon check-in, and the
            check-in refreshes every day at midnight. ✔
          </li>
          <li>
            3. Users earn 1 moemoepoint when their topics/replies/comments are
            liked ✔
          </li>
          <li>
            4. If someone replies to a user's topic, the user earns 2
            moemoepoints ✔
          </li>
          <li>
            5. If someone comments on a user's reply, the original poster
            receive 1 moemoepoint ✔
          </li>
          <li>
            6. If a user's topic/reply is promoted, they will receive 7
            moemoepoints ✔
          </li>
        </ul>
      </div>

      <div class="deduct">
        <h3>Deduction Methods</h3>
        <ul>
          <li>
            1. Users engaging in non-moe behavior will have points deducted (7,
            17, 77, 177, 777 points depending on severity)
          </li>
          <li>
            2. If a single topic is disliked 10 times, and after verification,
            100 moemoepoints will be deducted
          </li>
          <li>
            3. Each time a user promotes a topic, they will be deducted 17
            moemoepoints, but it can be done repeatedly ✔
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
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  margin: 10px 0;
  margin-left: 40px;

  li {
    margin: 5px 0;
  }
}

.kungalgamer > ul {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  margin-left: 20px;

  li {
    margin: 5px 0;
  }
}

.topic > ul {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  margin-left: 20px;

  li {
    margin: 5px 0;
  }
}
</style>
