const title = document.title;

window.addEventListener('blur', () => (document.title = 'Come back!'));
window.addEventListener('focus', () => (document.title = title));

const navigation = document.querySelectorAll('.nav_element');

navigation.forEach((element, ind) =>
    element.addEventListener('click', () => {
        navigation.forEach((element) => element.classList.remove('nav_element--active'));
        navigation[ind].classList.add('nav_element--active');
    }),
);
