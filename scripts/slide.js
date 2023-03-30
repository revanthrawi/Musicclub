const items = document.querySelectorAll('.item'),
controls = document.querySelectorAll('.control'),
headerItems = document.querySelectorAll('.item-header'),
descriptionItems = document.querySelectorAll('.item-description'),
activeDelay = .76,
interval = 5000;
let current = 0;
const slider = {
init: () => {
  controls.forEach(control => control.addEventListener('click', (e) => { slider.clickedControl(e) }));
  controls[current].classList.add('active');
  items[current].classList.add('active');
},
nextSlide: () => { // Increment current slide and add active class
  slider.reset();
  if (current === items.length - 1) current = -1; // Check if current slide is last in array
  current++;
  controls[current].classList.add('active');
  items[current].classList.add('active');
  slider.transitionDelay(headerItems);
  slider.transitionDelay(descriptionItems);
},
clickedControl: (e) => { // Add active class to clicked control and corresponding slide
  slider.reset();
  clearInterval(intervalF);

  const control = e.target,
    dataIndex = Number(control.dataset.index);

  control.classList.add('active');
  items.forEach((item, index) => {
    if (index === dataIndex) { // Add active class to corresponding slide
      item.classList.add('active');
    }
  })
  current = dataIndex; // Update current slide
  slider.transitionDelay(headerItems);
  slider.transitionDelay(descriptionItems);
  intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
},
reset: () => { // Remove active classes
  items.forEach(item => item.classList.remove('active'));
  controls.forEach(control => control.classList.remove('active'));
},
transitionDelay: (items) => { // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
  let seconds;

  items.forEach(item => {
    const children = item.childNodes; // .vertical-part(s)
    let count = 1,
      delay;

    item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

    children.forEach(child => { // iterate through .vertical-part(s) and style b element
      if (child.classList) {
        item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
        child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
        count++;
      }
    })
  })
},
}
let intervalF = setInterval(slider.nextSlide, interval);
slider.init();

let slide_data = [
    {
      src:
        "https://www.mediafire.com/convkey/222b/4zdf0tl6qjhwlr79g.jpg",

      title: "Hot on Musiclub",

    },
    {
      src:
        "https://www.mediafire.com/convkey/613f/iqi62eid9hy9il8zg.jpg?size_id=c",
      title: "Listen to Harry's House",
    },
    {
      src:
        "https://www.mediafire.com/convkey/cba5/dqzhi1p0im0pbyo7g.jpg",
      title: "Hop onto Telugu Hits",
    },
    {
      src:
        "https://www.mediafire.com/convkey/16be/6cvl84zgoppoakx9g.jpg?size_id=7",
      title: "Podcasts to brighten up your day",
    }
  ];
  let slides = [],
    captions = [];

  let autoplay = setInterval(function () { nextSlide(); }, 5000);
  let container = document.getElementById("container");
  let leftSlider = document.getElementById("left-col");
  // console.log(leftSlider);
  let down_button = document.getElementById("down_button");
  // let caption = document.getElementById('slider-caption');
  // let caption_heading = caption.querySelector('caption-heading');

  down_button.addEventListener("click", function (e) {
    e.preventDefault();
    clearInterval(autoplay);
    nextSlide();
    autoplay;
  });

  for (let i = 0; i < slide_data.length; i++) {
    let slide = document.createElement("div"),
      caption = document.createElement("div"),
      slide_title = document.createElement("div");

    slide.classList.add("slide");
    slide.setAttribute("style", "background:url(" + slide_data[i].src + ")");
    caption.classList.add("caption");
    slide_title.classList.add("caption-heading");
    slide_title.innerHTML = "<h1>" + slide_data[i].title + "</h1>";

    switch (i) {
      case 0:
        slide.classList.add("current");
        caption.classList.add("current-caption");
        break;
      case 1:
        slide.classList.add("next");
        caption.classList.add("next-caption");
        break;
      case slide_data.length - 1:
        slide.classList.add("previous");
        caption.classList.add("previous-caption");
        break;
      default:
        break;
    }
    caption.appendChild(slide_title);
    caption.insertAdjacentHTML(
      "beforeend",
      '<div class="caption-subhead"><span></span></div>'

    );
    slides.push(slide);
    captions.push(caption);
    leftSlider.appendChild(slide);
    container.appendChild(caption);
  }
  // console.log(slides);

  function nextSlide() {
    // caption.classList.add('offscreen');

    slides[0].classList.remove("current");
    slides[0].classList.add("previous", "change");
    slides[1].classList.remove("next");
    slides[1].classList.add("current");
    slides[2].classList.add("next");
    let last = slides.length - 1;
    slides[last].classList.remove("previous");

    captions[0].classList.remove("current-caption");
    captions[0].classList.add("previous-caption", "change");
    captions[1].classList.remove("next-caption");
    captions[1].classList.add("current-caption");
    captions[2].classList.add("next-caption");
    let last_caption = captions.length - 1;

    // console.log(last);
    captions[last].classList.remove("previous-caption");

    let placeholder = slides.shift();
    let captions_placeholder = captions.shift();
    slides.push(placeholder);
    captions.push(captions_placeholder);
  }

  let heading = document.querySelector(".caption-heading");

  function whichTransitionEvent() {
    var t,
      el = document.createElement("fakeelement");

    var transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }

