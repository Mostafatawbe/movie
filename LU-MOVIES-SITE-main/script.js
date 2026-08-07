const movies = [
    { 
        title: "Spider man", 
        image: "logo/Movies/ACTION/spiderman/spiderman/img.jpg", 
        description:"Even your friendly neighborhood superhero can use a vacation. But a new threat forces Peter Parker to swing into action during a school trip to Europe."
    },
    { 
        title: "Hitman", 
        image: "logo/Movies/ACTION/hitman/hitman/hitman.jpg", 
        description: "In this exciting action thriller,an assassin turns on his employers and seeks answers about his mysterious past."
    },
    { 
        title: "Venom", 
        image: "logo/Movies/ACTION/venom/venom/venom.jpg", 
        description: "In this sequel based on the Marvel Comics character, Eddie Brock and Venom face off against serial killer Cletus Kasady and his alien symbiote, Carnage."
    },
    { 
        title: "13hours", 
        image: "logo/Movies/ACTION/13hours/13hours/13hours.jpg", 
        description: "Members of an elite security team battle to save the lives of trapped US Consulate personnel under attack by armed terrorists in Benghazi, Libya.."
    },
    { 
        title: "Bad boys 1", 
        image: "logo/Movies/comedy/badboy (2)/badboy/AAAABTk9BibYdZGbcdCX0rbOiypX_MT8aZ7Ss11Wzertr-UGgZIwZPjMRqiWfNJxTF_Yu7Z3YSXLfk0RxForTuzFF5PugU76KwQTBbY.jpg", 
        description: "Two hip detectives protect a witness to a murder while investigating a case of stolen heroin from the evidence storage room from their police precinct."
    },
    { 
        title: "Daddys Home 2", 
        image: "logo/Movies/comedy/daddy's home/daddy's home/AAAABav7XxIEvSl37e0aCOpNfqYT8j9zZe4wpY-81T-hoWp2pd46OVtcxbus-X55LmfvILfMJvsNRKfQwfbA1J5ppug8lSvuU8KDA1s.jpg", 
        description: " Holidays are about time with loved ones. But for co-parenting dads Brad and Dusty, surprise guests make a blended-family Christmas much more complicated."
    },
    { 
        title: "LIAR LIAR", 
        image: "logo/Movies/comedy/LIAR LIAR/LIAR LIAR/AAAABbnQ_idz3oLGGXD6PrR-Q8YpAk2gc_riRNV8zC5hZeWv_7Av6g90UTUpZ_ON7YWeTKjOBzKWM9TAVHNUqifQmJk4hywq2gs0Gw4.jpg", 
        description: "After his son makes a birthday wish that magically comes true, an unscrupulous lawyer finds himself incapable of telling a lie for 24 hours."
    },
    { 
        title: "GODZILLA", 
        image: "logo/Movies/sci-fi/godzilla/godzilla/godzilla.jpg", 
        description: "In this exciting action thriller,an assassin turns on his employers and seeks answers about his mysterious paThis gripping tale of veterans fighting to protect a war-torn Japan from a nuclear-supercharged Godzilla won the Oscar for Best Visual Effects."
    },
    { 
        title: "Ninja turtles", 
        image: "logo/Movies/sci-fi/ninja turtles/ninja turtles/ninjaturtles.jpg", 
        description: "Aided by April and newcomer Casey, the Ninja Turtles fly into action after Shredder escapes prison and plots to take over the world with evil Krang."
    },
    { 
        title: "The Witcher", 
        image: "logo/Series/action/the witcher/the witcher/witcher.jpg", 
        description: "A massive hit across the globe, this epic tale of monsters, magic and destiny is incredibly fun to watch and easy to become immersed in, says Paste."
    },
    { 
        title: "Viking", 
        image: "logo/Series/drama/Viking/Viking/AAAABZy0bl8u--GBTvELOm114W3c3bdnHEArZAaqmXu1_yD7gZCw9b6wHNU-3eQYYr97HAo_EQu6oRTSQtZlUGHhPPNhv4UgAtzAsws.jpg", 
        description: "In this intense historical drama series, a Viking chieftain navigates politics, family and warfare in the Dark Ages."
    },
    { 
        title: "From", 
        image: "logo/Series/horror/from/from/AAAABfNBqpsNaQmVsU3ZER6eMa0SAX-XIZAkZFyzGqx_M0ZbzrJ4T1mbKmBvojr-aRuqud5r4sP4X5iWzb_DPDqAE7Uq_XiJ6cbuyIE.jpg", 
        description: "Colony House survivors try to heal. As flashbacks recall his early days in town, Boyd starts his journey with an unlikely companion by his side."
    },
    { 
        title: "Parasyte", 
        image: "logo/Series/anime/parasyte/parasyte/parasyte.jpg", 
        description: "A teenager battles an onslaught of parasites from space with help from Migi, a docile parasitic creature that's taken over his right hand."
    },
    { 
        title: "Record of Ragnarok", 
        image: "logo/Series/anime/record of ragnarok/record of ragnarok/recordofragnarok.jpg", 
        description: "Before eradicating humankind from the world, the gods give them one last chance to prove themselves worthy of survival. Let the Ragnarok battles begin!"
    },
    { 
        title: "Sweet home", 
        image: "logo/Series/horror/Sweet home/Sweet home/AAAABZvGxWhLmhGw8kTT3AIYLcLQm-1jVmVqy6RQ2m-wkGMvSB9YKMUUHlaLxMElEDL0ePyYNDAwW_c1HdnjMY4SV0aS0C1Y3sxmOgqcN7IsICsu6TNUZ4VnOzUxf1E9GB6uCGVG.jpg", 
        description: "Cha Hyun-su moves into the run-down Green Home by himself. Not long after, he witnesses a disturbing sight in his neighbor's apartment."
    },
    { 
        title: "Black List", 
        image: "logo/Series/drama/Blacklist/Blacklist/AAAABa93ASUF1VvGWm6sg_N3h9LeNJVNx5FwU6Dy9tjo5ubPeZalhQzEMun4eJh3HYq0E3i1dgux72nvsRnkrTj0Su6nDX6cO9r3fQY.jpg",
        description: "After turning himself in, a brilliant fugitive offers to help the FBI bag other baddies, but only if rookie profiler Elizabeth Keen is his partner."
    },
    { 
        title: "Happienes", 
        image: "logo/Series/horror/happienes/happienes/AAAABbFFYnlZaciguHixChdhL_TEc4KLxmg3m5yaOeRKEKamfXuxF_ZU5i6RqIxgcDlOjM68KIuu5a996xxghBlpqb8JMh8WmrtZbsA.jpg",
        description: "Jung Yi-hyun investigates a murder where the victim has teeth marks on his neck. After surviving an attack, Yoon Sae-bom gets taken to a facility."
    },
    { 
        title: "Dexter", 
        image: "logo/Series/drama/Dexter/Dexter/AAAABQkoSaj779wRmNAZ-Fi7b0_l4gmftLD28UHwt_L7xVCYLN1Dkw-xo191kXX6_rbBzfsdGLAqYFS3czFGGQDztdejlVrvfZqfIsw.jpg",
        description: "By day, mild-mannered Dexter is a blood spatter analyst for the Miami police. But at night, he is a serial killer who only targets other murderers."
    },
    { 
        title: "The Walking Dead", 
        image: "logo/Series/horror/The walking dead/The walking dead/AAAABY7jq5OJjNbIoPWcmlTPLkgBUSydZtFAzCp0TtKEzKZcOx2C51b_xSHuk2ujcnR1La04zSUJLOQyWZ__sFmatmiYfnt96cXa3sk.jpg",
        description: "Rick, Ezekiel and Maggie plot an elaborate attack on the Sanctuary. Carl encounters a mysterious stranger at a gas station."
    },
    { 
        title: "Black Summer", 
        image: "logo/Series/horror/black summer/black summer/images1.JPG",
        description: "n the dark, early days of a zombie apocalypse, complete strangers band together to find the strength they need to survive and get back to loved ones."
    },
    { 
        title: "Peaky blinders", 
        image: "logo/Series/drama/peaky blinders/peaky blinders/images.JPG",
        description: "By day, mild-mannered Dexter is a blood spatter analyst for the Miami police. But at night, he is a serial killer who only targets other murderers."
    },
    { 
        title: "Breaking Bad", 
        image: "logo/Series/drama/Breaking bad/Breaking bad/AAAABbGlgMzIVaHQYPX-8lNoYlPu_qRAjhBHKObk3zVje-E6kzbUA9LR32EicRvqw3yGyBbKV_EihluacIlW8AMUdftmazCDpAL11KY (1).jpg",
        description: "Diagnosed with terminal lung cancer, a high school chemistry teacher resorts to cooking and selling methamphetamine to provide for his family."
    },
    { 
        title: "Dark", 
        image: "logo/Series/sci-fi/dark/dark/dark.jpg",
        description: "Secrets unspool when a boy disappears from a small town in this cerebral series RogerEbert.com calls one of the most mind-melting shows on television."
    },
    { 
        title: "Berserk", 
        image: "logo/Series/anime/berserk/berserk/berserk.jpg",
        description: "A wandering, sword-wielding mercenary joins a charismatic leader in his ruthless pursuit of glory and recognition in this epic medieval tale."
    },
    { 
        title: "Sand Man", 
        image: "logo/Series/sci-fi/sandman/sandman/sandman.jpg",
        description: "Based on the graphic novels, this epic series mixing fantasy, myth and modern stories stars Tom Sturridge, Gwendoline Christie, Boyd Holbrook and more."
    },
    { 
        title: "Vampirediaries", 
        image: "logo/Series/sci-fi/vampirediaries/vampirediaries/vampirediaries.jpg",
        description: "It's the love triangle that launched a thousand fanfics. Damon is dark and impulsive. Stefan is tortured but steadfast. Which brother will Elena choose?"
    },
    { 
        title: "Hunter X Hunter", 
        image: "logo/Series/anime/hunterxhunter/hunterxhunter/hunterxhunter.jpg",
        description: "Most Hunters fight for riches, revenge or reputation. But Gon? He's battling for something more: a chance to follow in his legendary father’s footsteps."
    },
    { 
        title: "Death Note", 
        image: "logo/Series/anime/deathnote/deathnote/deathnote.jpg",
        description: "A brilliant young man gets his hands on a mystical notebook in this anime adaptation of the manga written by Tsugumi Ohba, illustrated by Takeshi Obata."
    },
    { 
        title: "Supa Cell", 
        image: "logo/Series/action/supa cell/supa cell/supacell.jpg",
        description: "This story about five Londoners who develop superpowers secured a perfect score on Rotten Tomatoes and hit the top 10 in 84 countries in its first week."
    },
    { 
        title: "Lost", 
        image: "logo/Series/action/lost/lost/lost.jpg",
        description: "Survivors of a plane crash band together to brave a deserted island's mysterious forces in this iconic series that won 10 Emmy Awards."
    }
];

document.getElementById("generate-btn").addEventListener("click", function() {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const movie = movies[randomIndex];

    document.getElementById("movie-title").textContent = movie.title;
    document.getElementById("movie-image").src = movie.image;
    document.getElementById("movie-image").alt = movie.title;
    document.getElementById("movie-description").innerHTML =`<b><strong> ${movie.description} </strong> </b>`;
});