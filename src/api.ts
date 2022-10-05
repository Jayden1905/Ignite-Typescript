// Base URL
const base_url = "https://api.rawg.io/api/";

// Getting the date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;

  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};

const getCurrentDay = () => {
  const day = new Date().getDay();

  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

// Current day/month/year
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();

const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYrear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

const newGames = `games?key=${
  import.meta.env.VITE_RAWG_API_KEY
}&dates=${lastYrear},${currentDate}&ordering=-released`;

// Popular Games
const popular_games = `games?key=${
  import.meta.env.VITE_RAWG_API_KEY
}&dates=${lastYrear},${currentDate}&ordering=-rating`;

const upcoming_games = `games?key=${
  import.meta.env.VITE_RAWG_API_KEY
}&dates=${currentDate},${nextYear}&ordering=-added`;

export const popularGamesUrl = () => `${base_url}${popular_games}`;
export const upcommingGamesUrl = () => `${base_url}${upcoming_games}`;
export const newGamesUrl = () => `${base_url}${newGames}`;

// Game Details
export const gameDetailsUrl = (game_id: number) =>
  `${base_url}games/${game_id}?key=${import.meta.env.VITE_RAWG_API_KEY}`;

// Game ScreentShots
export const gameScreenShotsUrl = (game_id: number) =>
  `${base_url}games/${game_id}/screenshots?key=${
    import.meta.env.VITE_RAWG_API_KEY
  }`;

// Search games
export const searchGameUrl = (game_name: string) =>
  `${base_url}games?key=${
    import.meta.env.VITE_RAWG_API_KEY
  }&search=${game_name}`;
