const menuButton = document.querySelector('.site-menu-toggle');
const siteMenu = document.querySelector('#site-navigation');

if (menuButton && siteMenu) {
  const header = menuButton.closest('.site-header');
  const mobile = window.matchMedia('(max-width: 700px)');
  const isOpen = () => menuButton.getAttribute('aria-expanded') === 'true';
  const setOpen = (open) => menuButton.setAttribute('aria-expanded', String(open));

  menuButton.addEventListener('click', () => setOpen(!isOpen()));
  siteMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', (event) => {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      menuButton.focus();
    }
  });
  mobile.addEventListener('change', () => setOpen(false));
  header.classList.add('menu-ready');
}
