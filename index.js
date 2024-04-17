/* Theme Button */
const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

/* Petition Signing */
const signNowButton = document.getElementById('sign-now-button');
signNowButton.addEventListener('click', validateForm);

function validateForm() {
  let containsErrors = false;
  const petitionInputs = document.getElementById("sign-petition").elements;

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.trim().length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    } else {
      petitionInputs[i].classList.remove('error');
    }
  }

  if (!containsErrors) {
    const person = {
      name: document.getElementById('name').value,
      hometown: document.getElementById('hometown').value,
      email: document.getElementById('email').value
    };

    addSignature(person);
    toggleModal(person);
    document.getElementById("sign-petition").reset();
  }
}

function addSignature(person) {
  const signaturePara = document.createElement('p');
  signaturePara.textContent = `🖊️ ${person.name} from ${person.hometown} supports this cause.`;
  document.getElementById('signatures').appendChild(signaturePara);
}

function toggleModal(person) {
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('thanks-modal-content');
  modalContent.textContent = `Thank you so much ${person.name}! ${person.hometown} represent!`;
  modal.style.display = 'flex';

  setTimeout(() => {
    modal.style.display = 'none';
  }, 4000); // The modal will disappear after 4 seconds
}

/* Animation and Reveal */
const animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

const revealableContainers = document.querySelectorAll('.revealable');
window.addEventListener('scroll', () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < window.innerHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
});

/* Reduce Motion */
document.getElementById('reduce-motion-btn').addEventListener('click', () => {
  Object.assign(animation, {
    transitionDuration: '0s',
    transitionDelay: '0s',
    revealDistance: 0,
    transitionTimingFunction: 'none'
  });

  document.querySelectorAll('.revealable').forEach(element => {
    element.style.transitionDuration = animation.transitionDuration;
    element.style.transitionDelay = animation.transitionDelay;
    element.style.transform = 'translateY(0px)';
    element.style.transitionTimingFunction = animation.transitionTimingFunction;
  });
});

// Animation
let scaleFactor = 1;
const modalImage = document.getElementById('modal-image');  

function scaleImage() {
  scaleFactor = (scaleFactor === 1) ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}

// Modify the existing toggleModal function
function toggleModal(person) {
  let modal = document.getElementById('thanks-modal');
  let modalContent = document.getElementById('thanks-modal-content');
  modalContent.textContent = `Thank you so much ${person.name}! ${person.hometown} represent!`;
  modal.style.display = 'flex';

  let intervalId = setInterval(scaleImage, 500);

  setTimeout(() => {
    modal.style.display = 'none';
    clearInterval(intervalId);  // Stop the animation when the modal is hidden
  }, 4000); // The modal will disappear after 4 seconds
}


