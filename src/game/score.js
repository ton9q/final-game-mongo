import { getUsers, addUser, updateUser } from './api-user';

class Score {
  static scoreItem(name, score) {
    const scoreItemTemplate = `
    <div class="score-item">
      <div class="name">${name}</div>
      <div class="score-in-game">${score}</div>
    </div>
    `;

    return scoreItemTemplate;
  }

  static async update() {
    $('.menu__score_container').empty();

    const users = await getUsers();
    const usersTemplates = [];

    users.map(user => usersTemplates.push(Score.scoreItem(user.name, user.score)));

    usersTemplates.map(user => $('.menu__score_container').append(user));
  }

  static async addUser(name, score) {
    const users = await getUsers();
    let newUser = true;

    users.forEach(user => {
      if (user.name === name) newUser = false;
    });

    const user = {
      name,
      score,
    };

    if (newUser) {
      await addUser(user);
    } else {
      let userScore = 0;

      users.forEach(currentUser => {
        if (currentUser.name === name) userScore = currentUser.score;
      });

      await updateUser({ ...user, score: user.score + userScore });
    }
  }
}

export default Score;
