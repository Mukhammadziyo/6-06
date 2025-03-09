import { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";

// Reducer uchun boshlang‘ich holat
const initialState = {
  theme: localStorage.getItem("darkMode") || "light",
};

// Reducer funksiyasi
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      const newTheme = state.theme === "dark-mode" ? "light" : "dark-mode";
      return { ...state, theme: newTheme };
    default:
      return state;
  }
}

function Navbar() {
  const { title } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(state.theme);
    localStorage.setItem("darkMode", state.theme);
  }, [state.theme]);

  return (
    <header className="header">
      <div className="header-container container">
        {title ? (
          <Link className="header-logo" to="/">
            <figure>
              <img
                src={`../assets/icon-${title.toLowerCase()}.svg`}
                alt="icon"
              />
            </figure>
            <span>{title}</span>
          </Link>
        ) : (
          <span></span>
        )}

        {/* NAVBAR TOGGLE */}
        <div>
          <label
            htmlFor="dark"
            className="dark-btn"
            onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          >
            <input
              type="checkbox"
              id="dark"
              checked={state.theme === "dark-mode"}
              readOnly
            />
            <span>
              <span></span>
              <span></span>
            </span>
          </label>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
