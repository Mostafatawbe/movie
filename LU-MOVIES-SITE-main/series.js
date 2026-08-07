const menu = document.getElementById('Downmenu');
const humberger = document.querySelector('.humberger');

humberger.addEventListener("click",function(){  
if (menu.style.display === 'block') {
  menu.style.display = 'none';
} else {
  menu.style.display = 'block';


  humberger.classList.toggle('active');
}
})
window.onclick = function (event) {
if (!menu.contains(event.target) && !humberger.contains(event.target)) {
  menu.style.display = 'none';
  humberger.classList.remove('active'); 
}
};
const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const h2Elements = document.querySelectorAll('h2');

// Function to toggle the dark and light mode
modeToggle.addEventListener('change', function () {
  // Toggle the light mode class based on checkbox state
  body.classList.toggle('light-mode', modeToggle.checked);

  // Toggle the light mode class for all h2 elements
  h2Elements.forEach(h2 => {
    h2.classList.toggle('light-mode', modeToggle.checked);
  });
});
const searchTab = document.querySelector('.searchTab');
const searchInput = document.querySelector('.searchInput');

// Generalized function to initialize carousels
function initializeCarousel(carouselSelector, slideSelector, prevButtonSelector, nextButtonSelector) {
    const carousel = document.querySelector(carouselSelector);
    const slides = document.querySelectorAll(slideSelector);
    const prevButton = document.querySelector(prevButtonSelector);
    const nextButton = document.querySelector(nextButtonSelector);

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Set initial carousel width to fit visible slides
    carousel.style.width = `${320 * totalSlides}px`;

    // Function to update the carousel position
    function updateCarousel() {
        // Looping ensures smooth transition between slides
        carousel.style.transition = 'transform 0.6s ease-in-out';

        // Ensure that when you loop, you don't get the black space
        carousel.style.transform = `translateX(-${(currentIndex % totalSlides) * 100}px)`;

        // Add 'active-slide' class to the current slide
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active-slide');
            } else {
                slide.classList.remove('active-slide');
            }
        });
    }

    // Function for the next slide (with looping)
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // Loop back to the first slide when the end is reached
        updateCarousel();
    }

    // Function for the previous slide (with looping)
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Loop to the last slide when the beginning is reached
        updateCarousel();
    }

    // Attach event listeners to the buttons
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Initialize the carousel
    updateCarousel();
}

// Toggle search input visibility
searchTab.addEventListener('click', () => {
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    }
});
// Initialize each carousel
initializeCarousel('.carousel1', '.carousel1 .slide1', '.carousel-container-smaller .prev', '.carousel-container-smaller .next', 370, 5);
initializeCarousel('.carousel2', '.carousel2 .slide1', '.carousel-container-smaller1 .prev', '.carousel-container-smaller1 .next', 370, 5);
initializeCarousel('.carousel3', '.carousel3 .slide1', '.carousel-container-smaller2 .prev', '.carousel-container-smaller2 .next', 370, 5);
initializeCarousel('.carousel4', '.carousel4 .slide1', '.carousel-container-smaller3 .prev', '.carousel-container-smaller3 .next', 370, 5);
initializeCarousel('.carousel5', '.carousel5 .slide1', '.carousel-container-smaller4 .prev', '.carousel-container-smaller4 .next', 370, 5);
function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
window.addEventListener("scroll", function() {
    const upperContainer = document.querySelector(".upper-container");
  
    if (window.scrollY > 50) { // When scroll is more than 50px
      upperContainer.classList.add("scrolled"); // Add class for opaque background
    } else {
      upperContainer.classList.remove("scrolled"); // Remove class for transparent background
    }
  });
  function displayMovieDetails(movie) {
    document.body.innerHTML = `
        <div style="font-family: Arial, sans-serif; color: white; background-color: #1c1c1c; padding: 30px; max-width: 1000px; margin: auto; border-radius: 10px;">
            <a href="home.html" style="
                display: inline-block;
                margin-bottom: 20px;
                padding: 10px 20px;
                background-color:rgb(69, 115, 145);
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
" onmouseover="this.style.backgroundColor='#0056b3'" onmouseout="this.style.backgroundColor='#007bff'">
                ⬅ Back to Home
            </a>
            
            <h1 style="text-align: center;">${movie.title}</h1>
            
            <div style="display: flex; gap: 20px;">
                <img src="${movie.image}" style="width: 350px; border-radius: 10px;">
                
                <div style="flex: 1;">
                    <p style="font-size: 18px;">${movie.description}</p>
                    <h3>User Score: ${movie.score}%</h3>
                    <h3>Release Date: ${movie.releaseDate}</h3>
                    <h3>Genres: ${movie.genres.join(" , ")}</h3>
                    <h3>Duration: ${movie.duration} min</h3>
                </div>
            </div>
 
            <h2 style="margin-top: 20px;">Trailer</h2>
            <iframe src="${movie.trailer}" style="width: 100%; height: 500px; border-radius: 10px;" frameborder="0" allowfullscreen></iframe>
 
            <h2 style="margin-top: 20px;">Cast</h2>
            <div style="display: flex; gap: 15px; margin-top: 10px;">
                ${movie.cast.map(actor => `
                    <div style="text-align: center;">
                        <img src="${actor.image}" style="width: 100px; height: 100px; border-radius: 50%;">
${actor.name}</p>
                    </div>
                `).join("")}
            </div>
 
            <h2 style="margin-top: 20px;">Movie Translated</h2>
            <p style="font-size: 18px;">${movie.languages.join(" , ")}</p>
        <button id="favoriteButton" style="display: block; margin: -300px 300px; padding: 10px 20px; font-size: 16px; background-color: rgb(69, 115, 145); color: white; border: none; border-radius: 5px; cursor: pointer;">
        </button>
        </div>
    `;
    const favoritesKey = "favorites";
    let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
 
   
    function isFavorite(movie) {
      return favorites.some(fav => fav.title === movie.title);
    }
 
   
    function updateFavoriteButton() {
      const favoriteButton = document.getElementById("favoriteButton");
      if (isFavorite(movie)) {
        favoriteButton.textContent = "Added to Favorites";
      } else {
        favoriteButton.textContent = "Add to Favorites";
      }
    }
 
    const favBtn =  document.getElementById("favoriteButton")
    favBtn.addEventListener("click", function() {
      if (isFavorite(movie)) {
       
        favorites = favorites.filter(fav => fav.title !== movie.title);
      } else {
       
        favorites.push(movie);
      }
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
      updateFavoriteButton();
 })
 updateFavoriteButton();
}

const hours  ={
    title: "13 HOURS",
    image: "logo/Movies/ACTION/13hours/13hours/13hours.jpg",
    description: "Members of an elite security team battle to save the lives of trapped US Consulate personnel under attack by armed terrorists in Benghazi, Libya.",
    score: 80,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Action", "Drama"],
    duration: 119,
    trailer: "https://www.youtube.com/embed/5MBjAN7jqsQ?si=7FJf5YWJ-0oMMEra",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const hitman  ={
    title: "hitman",
    image: "logo/Movies/ACTION/hitman/hitman/hitman.jpg",
    description: "In this exciting action thriller, an assassin turns on his employers and seeks answers about his mysterious past.",
    score: 69,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Action", "Drama"],
    duration: 111,
    trailer: "https://www.youtube.com/embed/alQlJDRnQkE?si=FM-zQaDT67pvLySV",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const spiderman ={
    title: "Spiderman",
    image: "logo/Movies/ACTION/spiderman/spiderman/img.jpg",
    description: "Even your friendly neighborhood superhero can use a vacation. But a new threat forces Peter Parker to swing into action during a school trip to Europe.",
    score: 69,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Action", "Drama"],
    duration: 111,
    trailer: "https://www.youtube.com/embed/t06RUxPbp_c?si=6VwJLlt6yDozTZzB",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const transformers ={
    title: "TRANSFORMERS",
    image: "logo/Movies/ACTION/transformers/transformers/transformers.jpg",
    description: "Even your friendly neighborhood superhero can use a vacation. But a new threat forces Peter Parker to swing into action during a school trip to Europe.",
    score: 44,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Action", "Drama"],
    duration: 121,
    trailer: "https://www.youtube.com/embed/u2NuUWuwPCM?si=Kq7gnsS4ibmF2f4h",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const venom ={
    title: "VENOM",
    image: "logo/Movies/ACTION/venom/venom/venom.jpg",
    description: "In this sequel based on the Marvel Comics character, Eddie Brock and Venom face off against serial killer Cletus Kasady and his alien symbiote, Carnage.",
    score: 99,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Action", "Drama"],
    duration: 121,
    trailer: "https://www.youtube.com/embed/u9Mv98Gr5pY?si=jxZ6BlyUQzSu_pej",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};

const kurokonobasketball ={
    title: "Kurokonobasketball",
    image: "logo/Movies/anime/kurokobasketall/kurokobasketall/kuroko.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 49,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "anime", "sport"],
    duration: 121,
    trailer: "https://www.youtube.com/embed/nb7e5_4CGag?si=FwIkvJp8fvC5IyVm",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const pokemon ={
    title: "Pokemon",
    image: "logo/Movies/anime/pokemon/pokemon/pokimon.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 76,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Anime", "Action"],
    duration: 111,
    trailer: "https://www.youtube.com/embed/8PGsP59Io20?si=FDo-XCBrhlP6XZQo",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const sevendeadlysins ={
    title: "Seven deadly sence",
    image: "logo/Movies/anime/seven deadly sins/seven deadly sins/sevendeadlysins.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 45,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Anime", "Action"],
    duration: 121,
    trailer: "https://www.youtube.com/embed/wxcvbL6o55M?si=1-kFF92pzjWo3NQ6",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const spyxfamily ={
    title: "Spyxfamily",
    image: "logo/Movies/anime/spyxfamily/spyxfamily/spyxfamily.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 75,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Anime", "Drama"],
    duration: 123,
    trailer: "https://www.youtube.com/embed/m5TxWbtQ7qU?si=AHxNo5J9y26_MhY8",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const violetevergarden ={
    title: "Violetevergarden",
    image: "logo/Movies/anime/violetevergarden/violetevergarden/violetevergarden.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 85,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Anime", "Action"],
    duration: 103,
    trailer: "https://www.youtube.com/embed/BUfSen2rYQs?si=BW0yGXS3iqUkSfp3",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const badboy ={
    title: "Badboy",
    image: "logo/Movies/comedy/badboy (2)/badboy/AAAABTk9BibYdZGbcdCX0rbOiypX_MT8aZ7Ss11Wzertr-UGgZIwZPjMRqiWfNJxTF_Yu7Z3YSXLfk0RxForTuzFF5PugU76KwQTBbY.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 81,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Comedy", "Action"],
    duration: 122,
    trailer: "https://www.youtube.com/embed/hRFY_Fesa9Q?si=eUMuVc6uRBb75zmd",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const daddyshome ={
    title: "Daddy's home",
    image: "logo/Movies/comedy/daddy's home/daddy's home/AAAABav7XxIEvSl37e0aCOpNfqYT8j9zZe4wpY-81T-hoWp2pd46OVtcxbus-X55LmfvILfMJvsNRKfQwfbA1J5ppug8lSvuU8KDA1s.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 41,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Comedy", "Action"],
    duration: 102,
    trailer: "https://www.youtube.com/embed/OeknNwE4e1E?si=P2l0Lp9fFQOD52dR",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const sololeveling ={
    title: "Solo leveling",
    image: "logo/Movies/Poster-Solo-Leveling-Season-1-91-5x61cm-Abystyle-GBYDCO705.webp",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 81,
    releaseDate: "2023-01-05",
    genres: ["Thriller", "Comedy", "Action"],
    duration: 102,
    trailer: "https://www.youtube.com/embed/OeknNwE4e1E?si=P2l0Lp9fFQOD52dR",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const liarliar ={
    title: "LIAR LIAR",
    image: "logo/Movies/comedy/LIAR LIAR/LIAR LIAR/AAAABbnQ_idz3oLGGXD6PrR-Q8YpAk2gc_riRNV8zC5hZeWv_7Av6g90UTUpZ_ON7YWeTKjOBzKWM9TAVHNUqifQmJk4hywq2gs0Gw4.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 61,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Comedy", "Action"],
    duration: 132,
    trailer: "https://www.youtube.com/embed/C1no75lpOiw?si=FRqmMxW1AY46YfFi",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const MIB ={
    title: "MIB",
    image: "logo/Movies/comedy/MIB/MIB/AAAABXae6VMA4l8N9jZhESJ2jdeIA8aC1fm6DovebEDDbkklhxPD90CLwCR6PvVDVh4UCjCEhW7S7CYdh95Sl9oUFIfq0N0fR7hYehU.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 71,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Comedy", "Action"],
    duration: 122,
    trailer: "https://www.youtube.com/embed/BV-WEb2oxLk?si=Q0ZAXpcKb9yilxyK",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const ridealong ={
    title: "Ridealong",
    image: "logo/Movies/comedy/Ride along/Ride along/AAAABVH5oCs-yRNIAszorggrvD9CVLmjkKWjjsreqqrCLq6ECD0eaOSFA1i-p8PwXyPdgZSsxMk80QyKqXiux4Qt8oGUhNJ40u_Bw50.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 61,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Comedy", "Action"],
    duration: 102,
    trailer: "https://www.youtube.com/embed/5klp6rkHIks?si=tHkRNm0MniZ0h5yB",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const day ={
    title: "356Day",
    image: "logo/Movies/drama/365/365/AAAABXDcas3-3m4I8zS71aGB-HWtyBECiGWBIr26PsRnDx5ioleq3gMTScysEmt7FVcw4Wmuxumv5MsFyzryeUMByBf-od49gnfxJ0g.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 64,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Drama", "Comedy"],
    duration: 122,
    trailer: "https://www.youtube.com/embed/pyM3z73oMAk?si=pXsfDIiQqCHPI7P4",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const brothers ={
    title: "Brothers",
    image: "logo/Movies/drama/Brothers/Brothers/AAAABdpkhOJpqPm4UQeCYGLNUcJoY16ksyReAO9pRtVCEKtoJWGYC0UCFqSM4RnjYkxj8cTBd0eYo0XNaRFG6gh4vDiCeZLAD9El8L0.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 51,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Drama", "Action"],
    duration: 142,
    trailer: "https://www.youtube.com/embed/XVnfFsMKbMo?si=g-nT_h56BnuEgh5f",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const gifted ={
    title: "Gifted",
    image: "logo/Movies/drama/gifted/gifted/AAAABTodktzMz63yrUjg_Eh6RtE7MU4v5oa877fMB88MWoO7y6vKXKGKsfuTCzuegmWqhMsZ6F0E_CtGRqzNzVM_JLXYCczsn8dwdcQ.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 56,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Drama", "Action"],
    duration: 122,
    trailer: "https://www.youtube.com/embed/XVnfFsMKbMo?si=g-nT_h56BnuEgh5f",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const thegodfather ={
    title: "The God Father",
    image: "logo/Movies/drama/The God father/The God father/AAAABWwopS2GP01nTscGMS2DScmEe64D5Si9USd4W-YsAz0mweNlqQTJOD-n7wdo-mxts6Ud7zqtZ21D4MH6UqyaQmM6IVRoxregFV8.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 71,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Drama", "Action"],
    duration: 122,
    trailer: "https://www.youtube.com/embed/sY1S34973zA?si=GiaI3RnmebkgTb6-",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const twilight={
    title:"Twilight",
    image: "logo/Movies/drama/twilight/twilight/AAAABbVfi7zEUOa58VwTNSBOvlNqvvTmtC3HZJKrdw2lgrHmWXHzFicwr2o9vVdaau3inCWUcA3xy3Bvi1gv5PNT-Zcpb1wgRmfFnVI.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 51,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Drama", "Action"],
    duration: 132,
    trailer: "https://www.youtube.com/embed/Bndl2nTHQdE?si=OdvZSCk2-dkFwHW6",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const alita ={
    title:"Alita",
    image: "logo/Movies/sci-fi/alita/alita/alita.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score:54,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "SCI-FI", "Action"],
    duration:111,
    trailer: "https://www.youtube.com/embed/w7pYhpJaJW8?si=5GkO-dUz6Pb8KRwG",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const godzila ={
    title:"Godzila",
    image: "logo/Movies/sci-fi/godzilla/godzilla/godzilla.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score:65,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "SCI-FI", "Action"],
    duration:123,
    trailer: "https://www.youtube.com/embed/QFxN2oDKk0E?si=MlUC-SIOWhzExFEK",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const moribius ={
    title:"Morbius",
    image: "logo/Movies/sci-fi/morbius/morbius/morbius.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score:99,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "SCI-FI", "Action"],
    duration:144,
    trailer: "https://www.youtube.com/embed/oZ6iiRrz1SY?si=jQc3ASO499eoD-UH",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const ninjaturtles ={
    title:"Ninja Turtles",
    image: "logo/Movies/sci-fi/ninja turtles/ninja turtles/ninjaturtles.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score:78 ,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "SCI-FI", "Action"],
    duration:122,
    trailer: "https://www.youtube.com/embed/wmUmujbedOo?si=nUMRGXmMX7-Did7s",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const predetor={
    title:"Predetor",
    image: "logo/Movies/sci-fi/predetor/predetor/predetor.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score:89 ,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "SCI-FI", "Action"],
    duration:144,
    trailer: "https://www.youtube.com/embed/VPI9E-wNK8s?si=yfdYpfNivGzR5bD_",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};


const Lost = {
    title: "Lost",
    image: "logo/Series/action/lost/lost/lost.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 50,
    trailer: "https://www.youtube.com/embed/KTu8iDynwNc?si=hDFODWRHEJXhcdAr",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const SupaCell = {
    title: "SupaCell",
    image: "logo/Series/action/supa cell/supa cell/supacell.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 75,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 50,
    trailer: "https://www.youtube.com/embed/0URJ2Gu4K2M?si=dRjk8zz27E5EZj7R",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const theRookie = {
    title: "The Rookie",
    image: "logo/Series/action/the rookie/the rookie/theRookie.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 78,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 50,
    trailer: "https://www.youtube.com/embed/8BPlx6eK1vc?si=DYpUhUJ7KRC-D8XV",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const wwe = {
    title: "wwe",
    image: "logo/Series/action/wwe/wwe/wwe.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 85,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 145,
    trailer: "https://www.youtube.com/embed/gqveO__zwkU?si=4GJLCyQkBNiNgdsh",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const theWitcher = {
    title: "The Witcher",
    image: "logo/Series/action/the witcher/the witcher/witcher.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 85,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/ndl1W4ltcmg?si=lZJk4-mAwhOWZgTs",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const berserk = {
    title: "Berserk",
    image: "logo/Series/anime/berserk/berserk/berserk.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 85,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 25,
    trailer: "https://www.youtube.com/embed/0MIw4xzxcTU?si=ykKObPOBS-RDl8Vn",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const deathnote = {
    title: "Death Note",
    image: "logo/Series/anime/deathnote/deathnote/deathnote.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 25,
    trailer: "https://www.youtube.com/embed/NlJZ-YgAt-c?si=xST4jeo0LbJ7QB3b",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const hunter = {
    title: "HunterxHunter",
    image: "logo/Series/anime/hunterxhunter/hunterxhunter/hunterxhunter.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 25,
    trailer: "https://www.youtube.com/embed/d6kBeJjTGnY?si=2JVRqs-pMJGiVPPx",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const Parasyte = {
    title: "Parasyte",
    image: "logo/Series/anime/parasyte/parasyte/parasyte.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 25,
    trailer: "https://www.youtube.com/embed/rj63TDpaBWk?si=iR4ta5CaeJlhV6vv",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const recordofragnarok = {
    title: "Record of Ragnarok",
    image: "logo/Series/anime/record of ragnarok/record of ragnarok/recordofragnarok.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 25,
    trailer: "https://www.youtube.com/embed/_9HxsIYORyE?si=z5qgVzaJLlP6qg12",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const BlackList = {
    title: "Black List",
    image: "logo/Series/drama/Blacklist/Blacklist/AAAABa93ASUF1VvGWm6sg_N3h9LeNJVNx5FwU6Dy9tjo5ubPeZalhQzEMun4eJh3HYq0E3i1dgux72nvsRnkrTj0Su6nDX6cO9r3fQY.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 55,
    trailer: "https://www.youtube.com/embed/JGBIimq1I3A?si=WheJt96mTFoQJ_Pe",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const breakingbad = {
    title: "Breaking Bad",
    image: "logo/Series/drama/Breaking bad/Breaking bad/AAAABbGlgMzIVaHQYPX-8lNoYlPu_qRAjhBHKObk3zVje-E6kzbUA9LR32EicRvqw3yGyBbKV_EihluacIlW8AMUdftmazCDpAL11KY (1).jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/HhesaQXLuRY?si=_ObRWtVZEvVeoUXX",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const Dexter = {
    title: "Dexter",
    image: "logo/Series/drama/Dexter/Dexter/AAAABQkoSaj779wRmNAZ-Fi7b0_l4gmftLD28UHwt_L7xVCYLN1Dkw-xo191kXX6_rbBzfsdGLAqYFS3czFGGQDztdejlVrvfZqfIsw.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/1UJz0O2NjOo?si=xpYdm5WL_6dLEr9Z",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const peakyblinders = {
    title: "Peaky Blinders",
    image: "logo/Series/drama/peaky blinders/peaky blinders/images.JPG",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/oVzVdvGIC7U?si=y53XSbyyDYxKJkS5",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
        
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const vikings = {
    title: "Vikings",
    image: "logo/Series/drama/Viking/Viking/AAAABZy0bl8u--GBTvELOm114W3c3bdnHEArZAaqmXu1_yD7gZCw9b6wHNU-3eQYYr97HAo_EQu6oRTSQtZlUGHhPPNhv4UgAtzAsws.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/9GgxinPwAGc?si=s_PqI-4LUXbSEOAH",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const blacksummer = {
    title: "Black Summer",
    image: "logo/Series/horror/black summer/black summer/images1.JPG",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/tQA1omPJN24?si=TIiKf4QzcqteczHY",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const from = {
    title: "From",
    image: "logo/Series/horror/from/from/AAAABfNBqpsNaQmVsU3ZER6eMa0SAX-XIZAkZFyzGqx_M0ZbzrJ4T1mbKmBvojr-aRuqud5r4sP4X5iWzb_DPDqAE7Uq_XiJ6cbuyIE.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/pDHqAj4eJcM?si=S_fE6w3nFYcan0YE",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const happienes = {
    title: "Happienes",
    image: "logo/Series/horror/happienes/happienes/AAAABbFFYnlZaciguHixChdhL_TEc4KLxmg3m5yaOeRKEKamfXuxF_ZU5i6RqIxgcDlOjM68KIuu5a996xxghBlpqb8JMh8WmrtZbsA.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/gqhUlldiLEo?si=fAz3nmmbGr_3LS2g",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const Sweethome = {
    title: "Sweet Home",
    image: "logo/Series/horror/Sweet home/Sweet home/AAAABZvGxWhLmhGw8kTT3AIYLcLQm-1jVmVqy6RQ2m-wkGMvSB9YKMUUHlaLxMElEDL0ePyYNDAwW_c1HdnjMY4SV0aS0C1Y3sxmOgqcN7IsICsu6TNUZ4VnOzUxf1E9GB6uCGVG.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/7rI56NmD33Y?si=9uZszgFCgfNMCEqE",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const Blacksummer = {
    title: "Black Summer",
    image: "logo/Series/horror/black summer/black summer/images1.JPG",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/tQA1omPJN24?si=dfF_GYsSShN9uIGh",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const thewalkingdead = {
    title: "the Walking Dead",
    image: "logo/Series/horror/The walking dead/The walking dead/AAAABY7jq5OJjNbIoPWcmlTPLkgBUSydZtFAzCp0TtKEzKZcOx2C51b_xSHuk2ujcnR1La04zSUJLOQyWZ__sFmatmiYfnt96cXa3sk.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/sfAc2U20uyg?si=f_I-gP06T1cOcDBZ",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const dark = {
    title: "Dark",
    image: "logo/Series/sci-fi/dark/dark/dark.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/rrwycJ08PSA?si=fWx3_aHB_r_n5Z9F",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const sandman = {
    title: "Sandman",
    image: "logo/Series/sci-fi/sandman/sandman/sandman.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 95,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/Z6pdYkqeT7A?si=AKBaECMFzojpOSvX",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const strangerthings = {
    title: "Stranger Things",
    image: "logo/Series/sci-fi/strangerthings/strangerthings/strangerthings.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 87,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/b9EkMc79ZSU?si=G0ZsrJ4P22WwHgjy",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const titans = {
    title: "Titans",
    image: "logo/Series/sci-fi/titans/titans/titans.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 87,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/iH44Z0QwrWQ?si=aQ5VRS8j6yDOpfF7",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const vampirediaries = {
    title: "Vampire Diaries",
    image: "logo/Series/sci-fi/vampirediaries/vampirediaries/vampirediaries.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 87,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/RO3Qp_XdR0w?si=Lba31R8xxSu2Z7WV",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const squidgame = {
    title: "Squid Game",
    image: "logo/ranking/AAAABaeZRVA4mOQJW9FTbkuPUDDe7RF3RUm_VLoxEskNGiSv4i9pAlrCQ13YsmuBbplxrXnFe5NyxILr1MKaUvvNCnz17atkfsC9U01mvjT8BMqqZyxZo5sOo11_AZz2YmJj1M1A9A.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 87,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/oqxAJKy0ii4?si=2v6pMtQ3B4xk7DPp",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const MO = {
    title: "MO",
    image: "logo/ranking/AAAABdNnc39Ry6wt0uyYEoVu33eGXHQxlxOuFyQ6J6XyKXlM1svaP_AUPM_7Bu-zqH1PBCCXxRloeFojBybAyYzZt04I7ZPwmMh7Hy1wMNw4Zaqe2NbS8cMyxY0D5W-nkdA7bum9dWb4hsiZrGMvzi8WlYjwM6E31Mh8ptC8uaMrEBb7T8bbn5aSpHWp8ykEEeRcH0A4eGeA5Hp9J.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 87,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/dtohea4CFbE?si=YwJT9inTtC0TyrMV",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const theRecruit = {
    title: "the Recruit",
    image: "logo/ranking/AAAABdZD4ldDngQKIvSIS5AOKD8ayizJRLsok0qhbQrQh_AkteXWCRE-wXebyrxk2Ff9EEo6uDBRCvxYMLRAlepLEgOgZL-snx_VDTdncy_5QsWpqK-SWjuzjzFqHFvDDJGcbJO8zj1WCSwNJl82hwVOLIBDserHImqaRNzM4faZRVewkoobM495ELMOcaJfUCw_jWRGuVC8rSLxU.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 67,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/Hywe0zDSSSE?si=q9jx9EQEgmHcVgO8",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const theNightAgent = {
    title: "The Night Agent",
    image: "logo/ranking/AAAABQBNSVne4TxHLLiQ9e4G6TZwkZLqcU1et9uqbh1CdiWubJFYfwb1j0UoLAiQbJ0_Hw3FAhzjwFEQ-PWg3pwkZC2-pPT8oWehl0f7n7aUuCyO4PZ_-ijmIv-SeaxKir7ugJwF-PAcEDdHIaBuiu1j3KBNkLaQ_GbJjBsMyuhxMWrPAg0Jd_NCHwJ16Nwkv9F55Ktay6koQ8lmJ.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 67,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/YDbnY9Obsfs?si=hJXzZIV_kqb73kr5",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const RoyalRumble = {
    title: "Royal Rumble",
    image: "logo/ranking/AAAABRXgNPxzo3UlpTd0xZSVxLb926yiFOYoYjjAn1Lv1hgXxNKheiO4Qvbe-x8EiUiMRmTrjp5H7bR-_PiN3X3ssLDS1tgtMViGcZN8EYZncMRpRbJD8x3adSkZu1rbK-Q9mOhXsuFdv3ZV0fdbg0L70gU2uzO5Ol9u4a89NRaR3POfrKqff8wl5UNydQ5rF9Pb9dZ88WkIgLdl3fczLG.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 67,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/182HvTREhyU?si=pZVdP9ENOVNWRPCq",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const thetrauma = {
    title: "The Trauma Code Heroes on Call",
    image: "logo/ranking/AAAABVCNjCLKqeA2Dfz0CcqOSt68jkZPpMNJlDe-E-2_hTJObT47qoqhp76b9xCs2pr_6jtxuEWIAZNQ2-bJy2xLvvl8AU9qNl1Ua8JtgOJTOVY6y501z_567auxH3wAwfvvjnzJ_PWWzx54uKvRylz8wsK9Yupv2be3Swe2OOB1QC-bgBfEiqJGkmMxIsn2eFInNzDraBK9Ouuk-b93nQ.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 67,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/pdDXO-dMjAc?si=3XrxHT9UWrdA48QM",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const yellowstone = {
    title: "Yellowstone",
    image: "logo/ranking/AAAABTWgrIBQxH7MLJiD5yvfSDGX806ar9LqgAvYCHbDPXd0jeNRZkNxKZEYYOuFLFXDVKqcXjM02d2l5w1qtrhhkYf7JA2wyw9WdRjpY3c2zagyUsqC6o5kMKt_TOtmn7IzE9dCptX13lV4tenlmRGHKJZW1uim51nwnWIzr4Qik8v0HTq1D_UhUQ2-zBBno5EoAAymnnsPrKKjC.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 67,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Crime", "Drama"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/jr32f0rnK1o?si=HhMIsZ4uaZfaVxiZ",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const Sonic ={
    title: "Sonic",
    image: "logo/sonic.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium harum blanditiis delectus. Voluptatem, incidunt ducimus quas rem amet at voluptas veniam nobis numquam pariatur? Provident, dolor a! Earum, fuga quisquam.",
    score: 81,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "Comedy", "Action"],
    duration: 122,
    trailer: "https://www.youtube.com/embed/qSu6i2iFMO0?si=deItML9YSjyqapDT,",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};
const Gameofthrones = {
    title: "Game Of Thrones ",
    image: "logo/got.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta non corrupti officia ipsam aspernatur dolorem aliquid quo nobis, error cumque sequi eveniet quasi fugit ullam asperiores repudiandae, culpa tempore.",
    score: 67,
    releaseDate: "2024-12-31",
    genres: ["Thriller", "crime", "Action"],
    duration: 45,
    trailer: "https://www.youtube.com/embed/KPLWWIOCOOQ?si=Pu8aIDOUToOngeRY",
    cast: [
        { name: "Actor 1", image: "logo/actors/actor.3.jpg" },
        { name: "Actor 2", image: "logo/actors/actor.jpg" },
        { name: "Actor 3", image: "logo/actors/actor2.jpg" }
    ],
    languages: ["Korean", "English", "Portuguese", "Spanish", "Mandarin", "Russian", "Thai"]
};