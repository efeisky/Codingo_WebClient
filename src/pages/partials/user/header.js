const closeMenu = () => {
    const headerMenu = document.querySelector(".header-menu");
    const arrow = document.querySelector(".arrow");
    headerMenu.style.display = "none";
    arrow.style.transform = "rotate(0deg)";
  };
  
  const toggleMenu = () => {
    const headerMenu = document.querySelector(".header-menu");
    const arrow = document.querySelector(".arrow");
    if (headerMenu.style.display === "none") {
      headerMenu.style.display = "flex";
      arrow.style.transform = "rotate(-180deg)";
    } else {
      closeMenu();
    }
  };
  
  export { closeMenu, toggleMenu };
  