function counter(n) {
  let currentCount = n;

  function printCount() {
    console.log(currentCount);
    if (currentCount === 0) {
      clearInterval(intervalId);
    } else {
      currentCount--;
    }
  }

  const intervalId = setInterval(printCount, 1000);
}

function createCounter(n) {
  let currentCount = n;
  let intervalId;

  return {
    start: function() {
      if (!intervalId) {
        console.log(currentCount);
        intervalId = setInterval(() => {
          if (currentCount === 0) {
            clearInterval(intervalId);
          } else {
            currentCount--;
            console.log(currentCount);
          }
        }, 1000);
      }
    },
    pause: function() {
      clearInterval(intervalId);
      intervalId = undefined;
    },
    stop: function() {
      clearInterval(intervalId);
      intervalId = undefined;
      currentCount = n;
    },
  };
}


function delay(N) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, N * 1000);
  });
}

function countDownFromN(N) {
  if (N < 0) {
    return Promise.resolve();
  }

  console.log(N);
  return delay(1).then(() => countDownFromN(N - 1));
}

function getFirstRepository(username) {
  const apiUrl = `https://api.github.com/users/${username}/repos`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(repositories => {
      if (repositories.length > 0) {
        return repositories[0].name;
      } else {
        throw new Error('User has no repositories.');
      }
    });
}

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  const response = await fetch(url);

  if (response.status === 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

async function getGithubUser() {
  let name;

  do {
    name = prompt("Введите логин?", "SilyaSU");

    try {
      const user = await loadJson(`https://api.github.com/users/${name}`);
      alert(`Полное имя: ${user.name}.`);
      return user;
    } catch (err) {
      if (err instanceof HttpError && err.response.status === 404) {
        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
      } else {
        throw err;
      }
    }
  } while (true);
}
