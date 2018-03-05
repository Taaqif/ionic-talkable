import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'

@Injectable()
export class FileServiceProvider {
  data: any;
  activePage: any;
  currentWeek: number;
  savedWordList: any;
  watchedVideos: any;
  allWeeks = [
    {
      "number": 1,
      "title": "Being Playful",
      "overview": "Learn how taking a playful approach when interacting with your child helps to boost their language learning.",
      "description": "These videos highlight the importance of taking a playful approach when interacting with your child. They demonstrate how to integrate playful moments into everyday activities. Remember, when you are playful your child is engaged and when they are engaged they are learning.",
      "videos": [{
        "id": "1-1",
        "title": "Being Playful - Part 1",
        "path": "assets/vid/1-1.mp4",
        "cover": ""
      }, {
        "id": "1-2",
        "title": "Being Playful - Part 2",
        "path": "assets/vid/1-2.mp4",
        "cover": ""
      }],
      "book": {
        "title": "Ten Little Fingers and Ten Little Toes",
        "author": "Mem Fox & Helen Oxenbury",
        "cover": "assets/img/book-cover/Week1.png",
        "tips": [
          "Use a sing-song voice when reading the rhythmic words in this book",
          "Use sound effects in the book - sneeze with the baby and cluck like a chicken",
          "Tickle your child's toes every time you read the phrase 'ten little toes'",
          "Slow down for the last three lines of the book and gently kiss your child's nose"
        ],
        "alternateBooks": [{
          "title": "Baby Beats",
          "author": "Karen Blair"
        }, {
          "title": "Tickle, Tickle",
          "author": "Helen Oxenbury"
        }, {
          "title": "Hello Baby",
          "author": "Mem Fox & Steve Jenkins"
        }]
      },

      "weeklyKeyWordSigns": {
        "videos": [
          "Tickle",
          "Drink",
          "Finished",
          "More"
        ],
        "activities": [
          "Play tickle games with your little one. Model the signs 'more', 'tickle' and 'finished'.",
          "Model the signs 'more', 'finished' and 'drink' at mealtimes.",
          "Build towers together out of blocks. Crash them over. Ask your child if they want 'more' or are 'finished'. Model the sign as you say the words.",
          "Blow bubbles together. Ask your child if they want 'more' or are 'finished'. Model the sign as you say the words."
        ]
      },
      "hintsTips": [
        "Your child learns language through play. So playtime is never wasted time.",
        "Get down on the floor with your child.",
        "Watch and wait. Don't be afraid of silence.",
        "Follow their lead. Talk about what they are doing."

      ]
    },
    {
      "number": 2,
      "title": "Natural Communication",
      "overview": "Discover the importance of keeping your communication natural when you are helping your child to learn new words.",
      "description": "These videos explain the importance of keeping your style of communication natural when you are helping your child to learn new words. They show you fun and intuitive ways to encourage your child to imitate and spontaneously use words that they have learned.",
      "videos": [{
        "id": "2-1",
        "title": "Natural Communication - Part 1",
        "path": "assets/vid/2-1.mp4",
        "cover": ""
      }, {
        "id": "2-2",
        "title": "Natural Communication - Part 2",
        "path": "assets/vid/2-2.mp4",
        "cover": ""
      }],
      "book": {
        "title": "The Very Hungry Caterpillar",
        "author": "Eric Carle",
        "cover": "assets/img/book-cover/Week2.png",
        "tips": [
          "Let your child turn the pages.",
          "Use an animated voice - for example when the caterpillar has a stomach ache, use a slow woeful tone.",
          "Stop, wait and watch what your child is interested in. Use words to express what they can see.",
          "Point to the fruit and other food in the book. As you point, name what you see."
        ],
        "alternateBooks": [{
          "title": "The Very Busy Spider",
          "author": "Eric Carle"
        }, {
          "title": "Sometimes I Like to Curl up in a Ball",
          "author": "Vicki Churchill & Charles Fuge"
        }, {
          "title": "Rosie's Walk",
          "author": "Pat Hutchins"
        }]
      },
      "weeklyKeyWordSigns": {
        "videos": [
          "Ball",
          "Eat",
          "Big",
          "Love"
        ],
        "activities": [
          "Kick and throw the ball together. Model the sign 'ball' each time you say the word.",
          "Model the signs 'more', 'finished' and 'eat' at mealtimes.",
          "Choose a 'big' and little ball. Set up some blocks to knock over. Roll the 'big ball' to crash the blocks over. Model 'more' as you set the blocks up again.",
          "Model the sign 'love' as you tuck your little one in every night. Play with soft toys, cuddle them and sign the word 'love'."
        ]
      },
      "hintsTips": [
        "Be a 'teacher' not a 'tester'.",
        "Ask less questions.",
        "Avoid using the phrases  'what's this?' and 'say________'.",
        "As well as naming objects, use action, location and describing words and words for people too."


      ]
    },
    {
      "number": 3,
      "title": "Repeat, Model, Expand",
      "overview": "Explore three interrelated strategies for teaching your child new words - repetition, modelling new words and expanding on your child's phrases.",
      "description": "These videos highlight three interrelated strategies for teaching your child new words: \n\n - repeating sounds and words your child uses \n - modelling new words for them to learn \n - expanding on the phrases that they use.\n\nThe three videos help you to identify your child's stage of language development and how to apply the most appropriate strategy to help them learn new words or expand on the phrases they are currently using.",
      "videos": [{
        "id": "3-1",
        "title": "Repeat",
        "path": "assets/vid/3-1.mp4",
        "cover": ""
      }, {
        "id": "3-2",
        "title": "Model",
        "path": "assets/vid/3-2.mp4",
        "cover": ""
      }, {
        "id": "3-3",
        "title": "Expand",
        "description": "",
        "path": "assets/vid/3-3.mp4",
        "cover": ""
      }],
      "book": {
        "title": "I Went Walking",
        "author": "Sue Williams & Julie Vivas",
        "cover": "assets/img/book-cover/Week3.png",
        "tips": [
          "Let your child turn the pages.",
          `Each time you turn to an animal page, wait to see what your child does.
          <br>-- If they point, you point too and say what you see. <br>-- If they make an animal sound, copy the sound.
          <br>-- If they name the animal, repeat it back.`,
          "Point to the pictures and model words to your child - 'ladder', 'muddy', 'licking'.",
          "Pause during the story and listen to your child. Add one extra key word to their phrase. If they say 'moo', you say 'moo cow', if they say pig say 'wash the pig'.",
          "Make the corresponding animal sound before you turn each page. Wait and see if your child copies you or tries to guess the animal that is on the next page."
        ],
        "alternateBooks": [{
          "title": "Time for Bed",
          "author": "Mem Fox & Jane Dyer"
        }, {
          "title": "Hello Baby",
          "author": "Mem Fox & Steve Jenkins"
        }, {
          "title": "Growl Like a Tiger",
          "author": "Alison Lester"
        }]
      },
      "weeklyKeyWordSigns": {
        "videos": [
          "Stop",
          "Cat",
          "Dog",
          "Hot"
        ],
        "activities": [
          "Get out to the park and have a run around. Stand still and say 'stop', modelling the sign.",
          "Model the signs 'cat' and 'dog' when you share the book <i>I went walking</i> together.",
          "When going for a walk, be on the lookout for cats and dogs. Model the signs as you see the animal.",
          "Model the sign 'hot' to your child when having a hot drink, or if the stove or oven are on. Remember to always say the word as you sign."
        ]
      },
      "hintsTips": [
        "Copy your child's sounds, words, facial, expression, body language and gestures.",
        "Model language by talking all the time.",
        "Add one more word on to your child's phrases.",
        "Talk about what is happening in the 'here and now'."

      ]
    },
    {
      "number": 4,
      "title": "Finding a Communication Opportunity",
      "overview": "Maximise language learning opportunities throughout your busy day by engaging your child in everyday activities such as getting dressed, having a bath and during mealtimes.",
      "description": "This video shows you how to maximise language learning opportunities throughout your busy day. \n\nHelping your child learn new words isn't about finding special teaching time, it's about engaging them in everyday activities such as getting dressed, having a bath and during mealtimes.",
      "videos": [{
        "id": "4-1",
        "title": "Finding a Communication Opportunity",
        "path": "assets/vid/4-1.mp4",
        "cover": ""
      }],
      "book": {
        "title": "Perfect",
        "author": "Danny Parker & Freya Blackwood",
        "cover": "assets/img/book-cover/Week4.png",
        "tips": [
          "Talk about what you can see in the pictures (the broken egg on the floor, the cat in the tree).",
          "Use noises to accompany your story telling – cows 'mooing', 'pitter patter' of rain on the window, 'splish splash splosh' in the water.",
          "Talk about the routines that are familiar to your child. Eating breakfast, drawing, checking the letter box, going to bed.",
          "Focus on the same words/phrases that you are using in everyday activities (e.g. 'Here's a spoon', 'stir, stir, stir', 'wipe the table', 'eat your toast').If they point, you point too and say what you see. "
        ],
        "alternateBooks": [{
          "title": "Peepo",
          "author": "Janet and Allan Ahlberg"
        }, {
          "title": "Grandpa and Thomas",
          "author": "Pamela Allen"
        }, {
          "title": "Imagine",
          "author": "Alison Lester"
        }]
      },
      "weeklyKeyWordSigns": {
        "videos": [
          "Bath",
          "Wash",
          "Sleep",
          "Where"
        ],
        "activities": [
          "Model the sign bath each evening as you prepare for bath time. As the bath is running, talk about how you will wash. Splash together in the bath, sign 'wash' as you play together and wash the duckie.",
          "'Where' is a great sign to use throughout the day: 'where are my keys?', 'where's teddy?', 'where's mummy?'.",
          "As you prepare your child for bed time, and at each nap, sign the word sleep. As you tuck your child in use the sign 'love'.",
          "Play with soft toys together. Put them to sleep, give them a bath or a drink, tickle them. Hide the toys and say 'where's teddy/cat/dog?'."
        ]
      },
      "hintsTips": [
        "Every interaction with your child is a language learning opportunity.",
        "Help your child 'map' words onto their experiences by talking about what they are seeing, hearing, touching, tasting and smelling.",
        "Use single words and short simple phrases.",
        "Focus on one routine that you do every day and plan a new word and sign to use over and over in this situation."


      ]
    },
    {
      "number": 5,
      "title": "Sharing Books and Using Songs",
      "overview": "Discover just how critical sharing books with your child is for their vocabulary development and later literacy success.",
      "description": "The first video highlights how critical sharing books with your child is for their vocabulary development and later literacy success. It explains the concept of the book sharing triangle and other strategies for getting the most out of sharing books with your little one. For more great book suggestions head to http://www.talkable.org.au/story-time.\n\nThe second video demonstrates the key role childrens songs and rhymes play in their language learning. It doesn't matter how tuneful your voice is, your little one will be engaged when you sing and share rhymes together. To learn a new song or rhyme head to http://www.talkable.org.au/childrens-songs-rhymes.",
      "videos": [{
        "id": "5-1",
        "title": "Sharing Books",
        "path": "assets/vid/5-1.mp4",
        "cover": ""
      }, {
        "id": "5-2",
        "title": "Using Songs and Rhymes",
        "path": "assets/vid/5-2.mp4",
        "cover": ""
      }],
      "book": {
        "title": "Old Macdonald had a farm",
        "author": "Pam Adams",
        "cover": "assets/img/book-cover/Week5.png",
        "tips": [
          "Talk about the different animals. Make the corresponding animal noises.",
          "Pause before you say the animal name. Wait and see if your child attempts to say the animal or make an animal sound.",
          "Use toy animals during play time and sing Old MacDonald. Let your child choose which animal comes next.",
          "Put animals into a bag or pillow slip. Let your child pull them out one by one as you sing the song."
        ],
        "alternateBooks": [{
          "title": "Heads, Shoulders, Knees and Toes",
          "author": "Annie Kubler"
        }, {
          "title": "If You're Happy and You Know It",
          "author": "Annie Kubler"
        }]
      },
      "weeklyKeyWordSigns": {
        "videos": [
          "Book",
          "Sing",
          "Banana",
          "Teddy Bear"
        ],
        "activities": [
          "Give your child the choice between a book or a song. Ask 'book or sing' signing with each option. Ask your child if they want more or if they are finished.",
          "At snack time use the signs eat, drink and banana. Sign the phrase 'eat the banana'. If your child prefers a different fruit, learn the sign at www.auslan.org.au.",
          "Sing Round and Round the Garden and Teddy bear Teddy bear with your little one. Sign sing and teddy to your child as you play together.",
          "Play with your favourite teddy bear. Feed the teddy and sign eat, banana and drink. Sing and read a book to the teddy too."
        ]
      },
      "hintsTips": [
        "Focus on one routine that you do every day and plan a new word and sign to use over and over in this situation.",
        "Always have books out with your child's other toys.",
        "Share books everyday – repeat the same books over and over.",
        "Use songs and rhymes in your everyday routines.",
        "Watch your child as you sing and slow down to their pace. Encourage them to imitate your actions as you sing together."
      ]
    },
    {
      "number": 6,
      "title": "Using Visual Cues",
      "overview": "Find out how you can use a wide variety of visual supports when talking with your child to help them learn new words.",
      "description": "This video explains how using a wide variety of visual supports when talking with your child can help them learn new words. Visual cues are easier for young children to process than spoken words and show them what a word means. \n\nThis video explores how to use visual cues, such as using real objects, pictures and key word signs, when you communicate with your little one.",
      "videos": [{
        "id": "6-1",
        "title": "Using Visual Cues",
        "path": "assets/vid/6-1.mp4",
        "cover": ""
      }],
      "book": {
        "title": "Who Sank the Boat?",
        "author": "Pamela Allen",
        "cover": "assets/img/book-cover/Week6.png",
        "tips": [
          "Use the key word sign 'book' when telling your child it is story time.",
          "Talk about what is happening in each picture 'The donkey climbed into the boat', 'Splash', 'They all got wet!'",
          "Point to different parts of the picture as you explain what is happening.",
          "Watch your child's gesture. Talk about what they point to.",
          "Act out the story during bath time. Use your child's bath toys to re-create the story."
        ],

        "alternateBooks": [{
          "title": "Sometimes I Like to Curl Up in a Ball",
          "author": "Viki Churchill & Charles Fuge"
        }, {
          "title": "Toddlerobics",
          "author": "Zita Newcome"
        }, {
          "title": "Baby Faces",
          "author": "DK Publishing"
        }]
      },
      "weeklyKeyWordSigns": {
        "videos": [
          "Wet",
          "Hungry",
          "Bird",
          "Milk"
        ],
        "activities": [
          "Use the sign wet at bath time and when changing your child's nappy or clothes.",
          "Sign hungry before each meal and snack time. When your child is expressing hunger model 'you're hungry'.",
          "When you are out for a walk look around and talk about the birds. If you see a bird eating model 'bird's hungry'.",
          "Add the sign for milk to your mealtime repertoire. Use the phrase 'drink your milk'."
        ]
      },
      "hintsTips": [
        "Use your chosen key word signs and natural gesture throughout the day in many different situations.",
        "When sharing stories direct your child to specific parts of a picture by pointing as you explain what is happening.",
        "Show your child objects as you talk about them.",
        "Demonstrate actions while you say the word (e.g. 'splash' while splashing in the bath, 'Run' while your child is running)."
      ]
    },
    {
      "number": 7,
      "title": "Exploring Sounds",
      "overview": "Discover how you can take the pressure off learning words by having fun and simply exploring sounds together.",
      "description": "This video explains how to take the pressure off learning words, and just have fun, by exploring sounds. Through everyday activities and play, making sounds is a great way to engage your child. You never know, they may even begin to copy you.",
      "videos": [{
        "id": "7-1",
        "title": "Exploring Sounds",
        "path": "assets/vid/7-1.mp4",
        "cover": ""
      }],
      "book": {
        "title": "Beep, Beep",
        "author": "Peter Horacek",
        "cover": "assets/img/book-cover/Week7.png",
        "tips": [
          "As you read the story make sounds in an animated way.",
          "Pause after you make a sound to see if your child copies you.",
          "Make the same sounds when you play with toy cars together.",
          "Read the same book over and over. Repeat the sounds for your child.",
          "Make sounds when you share other books too."
        ],
        "alternateBooks": [{

          "title": "Dig Dig Digging",
          "author": "Margaret Mayo & Alex Ayliffe"
        }, {
          "title": "Growl Like a Tiger",
          "author": "Alison Lester"
        }, {
          "title": "Baby Beats",
          "author": "Karen Blair"
        }]
      },
      "weeklyKeyWordSigns": {
        "videos": [
          "Dirty",
          "Home",
          "Broken",
          "Flower"
        ],
        "activities": [
          "Use dirty when changing your child's nappy or clothes, wiping their hands and at bath time. Say 'you're wet and dirty' and 'you're dirty. Time for a bath'. 'Wash' that body.",
          "Use the phrase 'time to go home' when leaving the park, shops or a friend's house.",
          "Children are usually very intrigued by things that are broken. Sign 'broken' when a glass breaks or you come across a broken toy.",
          "Add the sign flower to your repertoire when you are out and about for a walk. Use phrases like 'the bird is on the flower'."
        ]
      },
      "hintsTips": [
        "Follow your child's lead. Make sounds that match what they're doing.",
        "Be exciting with the sounds that you make.",
        "Don't ask your child to repeat you. Simply model sounds and wait to see what your child does.",
        "When your child makes a sound, repeat it back with enthusiasm."
      ]
    },
    {
      "number": 8,
      "title": "Learning to Listen",
      "overview": "Learning to listen is a skill that develops over time. Learn how to maximise your child's ability to pay attention to the words you are saying.",
      "description": "This video explains that learning to listen is a skill that develops over time. Reducing background distractions and breaking longer sentences into short phrases is integral to maximise your child's ability to pay attention to the words you are saying. The video also provides some fun listening games for you to play with your little one.",
      "videos": [{
        "id": "8-1",
        "title": "Learning to Listen",
        "path": "assets/vid/8-1.mp4",
        "cover": ""
      }],
      "book": {
        "title": "Brown Bear, Brown Bear, What Do You See?",
        "author": "Bill Martic Jr & Eric Carle",
        "cover": "assets/img/book-cover/Week8.png",
        "tips": [
          "Vary the volume of your voice to engage your child.",
          "Pause after the line 'What do you see?'.  Make the next animal sound before you turn the page.",
          "Give your child time to copy the sounds you make.",
          "Explore the animals at the end of the book. Point to the animal and make the corresponding sound. Always name the animal for your child."

        ],
        "alternateBooks": [{
          "author": "Dear Zoo",
          "title": "Rod Campbell"
        }, {
          "author": "Growl Like a Tiger",
          "title": "Alison Lester"
        }, {
          "author": "I Went Walking",
          "title": "Sue Williams & Julie Vivas"
        }]
      },
      "weeklyKeyWordSigns": {
        "videos": [
          "Hat",
          "Shoes",
          "Thank You",
          "Car"
        ],
        "activities": [
          "Sign hat and shoes as you get ready to play outside. Use the phrase 'where's your hat' and 'where are your shoes' as you search for them together.",
          "Practice modelling 'thank you' when your child gives you something.",
          "Use the sign for car when you talk about going in the car. Car is also another great sign to use when you are out and about.",
          "Play dress-ups with your teddy. Put the hat and shoes on the teddy."
        ]
      },
      "hintsTips": [
        "Musical Instruments -  Talk about 'loud' and 'quiet', 'fast' and 'slow', 'go' and 'stop' as you play together.",
        "Object in a Bag – Hide a range of objects in a bag. Make the corresponding sound as your child pulls the items from the bag (for example a toy dog, car or phone).",
        "Environmental Sounds – Go for a walk together. Stop and listen to all the sounds you can hear. Talk about the sounds. For example 'Oh that's a dog barking. Woof Woof Woof', 'Listen to the bird', 'What a noisy motorbike!'.",
        "Hide and Seek – Hide a music box, musical toy or your phone. With your child, search for the sound-making object together. For babies simply hide the object under a scarf or blanket and help them explore and discover what is making the noise."
      ]
    },
    {
      "number": 9,
      "title": "Offering Choices",
      "overview": "Offering choices is a great way to expand your child's vocabulary and phrase length. Explore this video to give your child a greater sense of control and also develop their language in a natural way.",
      "description": "This video looks in-depth at the strategy of offering choices as a way to expand your child's vocabulary and phrase length. This communication strategy is great for giving your child a sense of control and also for developing their language in a natural way.",
      "videos": [{
        "id": "9-1",
        "title": "Offering Choices",
        "path": "assets/vid/9-1.mp4",
        "cover": ""
      }],
      "book": {
        "title": "Kissed by the Moon",
        "author": "Alison Lester",
        "cover": "assets/img/book-cover/Week9.jpg",
        "tips": [
          "Each time you read with your child offer them a choice between two books.",
          "Give them a choice of where you will read the book 'on the chair or on the floor' (point as you offer the choice).",
          "Talk about what you can see in the pictures. Keep your phrase length at your child's language level.",
          "Model the signs 'baby', 'mummy' and 'daddy' as you talk about the pictures. Use the sign 'cold' when talking about the rain, snow and water at the beach."
        ],
        "alternateBooks": [{
          "author": "Michael Rosen & Helen Oxenbury",
          "title": "Going on a Bear Hunt"
        }, {
          "author": "Charles Fuge & Vicki Churchill",
          "title": "Sometimes I like to curl up in a ball"
        }]
      },
      "weeklyKeyWordSigns": {
        "videos": [
          "Baby",
          "Cold",
          "Daddy",
          "Mummy"
        ],
        "activities": [
          "Use the sign for baby as you play together. Use phrases like 'baby's sleeping' or 'baby's hungry'.",
          "Use the phrases 'where's mummy' and 'where's daddy' when playing hide and seek.",
          "Use the phrases 'mummy's home' and 'daddy's home' as you hear the keys in the front door.",
          "Add the word cold to your bath time repertoire. Try phrases like 'the bath's cold' or 'cold water'."
        ]
      },
      "hintsTips": [
        "Think about how you could be offering your child choices in every day activities.",
        "Always show your child the choice as you say the word.",
        "Give your child time to choose and respond.",
        "Don't withhold items as this can lead to frustration, instead simply model the target word again as you give the child the item they want."
      ]
    },
    {
      "number": 10,
      "title": "Communication Temptations",
      "overview": "Learn how to have fun with a range of everyday activities and games aimed at encouraging your child to use language in a spontaneous and functional way.",
      "description": "This is the final video in the ten-week program and it explores the use of communication temptations to encourage your child to use words. It explains how to implement these tasks and gives a range of examples that you can integrate into everyday communication with your little one.",
      "videos": [{
        "id": "10-1",
        "title": "Communication Temptations",
        "path": "assets/vid/10-1.mp4",
        "cover": ""
      }],
      "book": {
        "title": "Dear Zoo",
        "author": "Rod Campbell",
        "cover": "assets/img/book-cover/Week10.jpg",
        "tips": [
          "Lift the flap books can be great communication temptations and little hands often need a little help to open the flaps.",
          "Model the word 'help' or 'open' each time your child needs assistance.",
          "Talk about the animals that are hiding. Make the corresponding animal noises.",
          "Let your child turn the pages. Don't worry if they keep going back to a favourite page, simply talk about what you can see."
        ],
        "alternateBooks": [{
          "author": "Jeannette Rowe",
          "title": "Whose Nose/Feet?"
        }, {
          "author": "Eric Hil",
          "title": "Where's Spot?"
        }, {
          "author": "Lynley Dodd",
          "title": "Where is Hairy Maclary?"
        }, {
          "author": "Nina Laden",
          "title": "Peek-a Who?"
        }]
      },
      "weeklyKeyWordSigns": {
        "videos": [
          "Doll",
          "Help",
          "Open",
          "Plane"
        ],
        "activities": [
          "Sign the target word 'help' or 'open' during communication temptations.",
          "Use short phrases like 'mummy will help' or 'daddy will open it' when your child needs your assistance.",
          "Talk about the planes in the sky when you are out together. Use phrases like 'big plane' or 'where's the plane?'.",
          "Play with dolls together. Talk about what the doll is doing. 'Dolly is hungry', 'Dolly is eating', 'Dolly is drinking', 'Dolly is sleeping', 'Dolly is in the car'."
        ]
      },
      "hintsTips": [
        "Choose activities that will be fun and motivating for your child.",
        "Leave plenty of time for them to ask for 'more' or 'help' (or the target word of your choice).",
        "Make sure your child is having fun. If they're not, stop and move to another activity.",
        "Avoid these types of activities when your child is tired."
      ]
    }
  ];
  wordList = {
    "Action words": [
      "Bite",
      "Blow",
      "Break",
      "Bring",
      "Build",
      "Bump",
      "Buy",
      "Carry",
      "Catch",
      "Chase",
      "Clap",
      "Clean",
      "Climb",
      "Cook",
      "Cover",
      "Cry",
      "Cut",
      "Dance",
      "Draw / write",
      "Drink",
      "Drive",
      "Drop",
      "Dry",
      "Eat",
      "Fall",
      "Feed",
      "Find",
      "Finish",
      "Fit",
      "Fix",
      "Get",
      "Give",
      "Go",
      "Hear",
      "Help",
      "Hide",
      "Hit",
      "Hold",
      "Hug",
      "Jump",
      "Kick",
      "Kiss",
      "Knock",
      "Lick",
      "Like",
      "Listen",
      "Look",
      "Love",
      "Make",
      "Open",
      "Paint",
      "Play",
      "Pop",
      "Pour",
      "Pretend",
      "Pull",
      "Push",
      "Put",
      "Read",
      "Ride",
      "Rip",
      "Run",
      "Say",
      "See",
      "Shake",
      "Share",
      "Show",
      "Sing",
      "Sit",
      "Sleep",
      "Smile",
      "Spill",
      "Splash",
      "Stand",
      "Stay",
      "Stop",
      "Sweep",
      "Swim",
      "Swing",
      "Take",
      "Talk",
      "Taste",
      "Throw",
      "Tickle",
      "Touch",
      "Wait",
      "Wake",
      "Walk",
      "Wash",
      "Watch",
      "Wipe",
      "Wish",
      "Work"
    ],
    "Animals (real or toy)": [
      "Animal",
      "Ant",
      "Bear",
      "Bee",
      "Bird",
      "Bug",
      "Bunny",
      "Butterfly",
      "Cat",
      "Chicken",
      "Cow",
      "Crocodile",
      "Dog/puppy",
      "Donkey",
      "Duck",
      "Elephant",
      "Fish",
      "Frog",
      "Giraffe",
      "Goose",
      "Hen",
      "Horse",
      "Lamb",
      "Lion",
      "Monkey",
      "Mouse",
      "Owl",
      "Penguin",
      "Pig",
      "Rooster",
      "Sheep",
      "Teddy bear",
      "Tiger",
      "Turkey",
      "Turtle",
      "Wolf",
      "Zebra"
    ],
    "Body parts": [
      "Ankle",
      "Arm",
      "Belly button",
      "Bottom",
      "Cheek",
      "Chin",
      "Ear",
      "Eye",
      "Face",
      "Finger",
      "Foot",
      "Hair",
      "Hand",
      "Head",
      "Knee",
      "Leg",
      "Lips / mouth",
      "Nose",
      "Shoulder",
      "Toe",
      "Tongue",
      "Tooth / teeth",
      "Tummy"
    ],
    "Clothing": [
      "Bib",
      "Boots",
      "Button",
      "Dress",
      "Gloves",
      "Hat",
      "Jacket",
      "Jeans",
      "Jumper",
      "Nappy",
      "Necklace",
      "Pajamas",
      "Pants",
      "Scarf",
      "Shirt",
      "Shoe",
      "Shorts",
      "Slipper",
      "Socks",
      "Tights",
      "Underpants / knickers",
      "Zip"
    ],
    "Descriptive words": [
      "All gone",
      "Asleep",
      "Awake",
      "Better",
      "Big",
      "Black",
      "Blue",
      "Broken",
      "Brown",
      "Careful",
      "Clean",
      "Cold",
      "Cute",
      "Dark",
      "Dirty",
      "Dry",
      "Empty",
      "Fast",
      "Full",
      "Gentle",
      "Good",
      "Green",
      "Happy",
      "Hard",
      "Heavy",
      "High",
      "Hot",
      "Hungry",
      "Hurt",
      "Last",
      "Little",
      "Long",
      "Loud",
      "Naughty",
      "New",
      "Noisy",
      "Old",
      "Orange",
      "Pretty",
      "Quiet",
      "Red",
      "Sad",
      "Scared",
      "Sick",
      "Sleepy",
      "Slow",
      "Soft",
      "Sticky",
      "Stuck",
      "Sunny",
      "Thirsty",
      "Tiny",
      "Tired",
      "Wet",
      "White",
      "Windy",
      "Yellow",
      "Yucky"
    ],
    "Food and drink": [
      "Apple",
      "Avacado",
      "Banana",
      "Beans",
      "Biscuit",
      "Bread",
      "Butter",
      "Cake / muffin",
      "Carrots",
      "Cereal",
      "Cheese",
      "Chicken",
      "Chips",
      "Chocolate",
      "Coffee",
      "Corn",
      "Cracker",
      "Drink",
      "Egg",
      "Fish",
      "Food",
      "Grapes",
      "Ice cream  / dessert",
      "Jelly",
      "Juice",
      "Lolly",
      "Meat",
      "Milk",
      "Noodles / pasta",
      "Nuts",
      "Orange",
      "Pancake",
      "Peanut butter",
      "Peas",
      "Pizza",
      "Pop corn",
      "Potato",
      "Pumpkin",
      "Saltana",
      "Sandwich",
      "Soup",
      "Spaghetti",
      "Strawberry",
      "Toast",
      "Tomato",
      "Tuna",
      "Water",
      "Watermelon",
      "Yogurt"
    ],
    "Furniture and rooms": [
      "Bath / bathroom",
      "Bed / cot",
      "Bedroom",
      "Bench",
      "Chair",
      "Couch / sofa",
      "Cupboard / wardrobe",
      "Dishwasher",
      "Door",
      "Drawer",
      "Dryer",
      "Fridge",
      "High chair",
      "Kitchen",
      "Living room",
      "Oven",
      "Potty",
      "Room",
      "Shower",
      "Sink",
      "Stairs",
      "Stove",
      "Table",
      "Toilet",
      "Tv",
      "Washing machine",
      "Window"
    ],
    "Games and routines": [
      "Bath",
      "Breakfast",
      "Bye-bye",
      "Dinner",
      "Good night",
      "Hi / hello",
      "High five",
      "Lunch",
      "No",
      "Peekaboo",
      "Please",
      "Snack",
      "Thank you",
      "Yes"
    ],
    "Outside": [
      "Bloud",
      "Bucket",
      "Flower",
      "Garden",
      "Grass",
      "Hose",
      "Ladder",
      "Lawn mower",
      "Moon",
      "Outside/ backyard",
      "Pool",
      "Rain",
      "Rock",
      "Roof",
      "Sandpit",
      "Shovel / spade",
      "Sky",
      "Slide",
      "Sprinkler",
      "Star",
      "Stick",
      "Street",
      "Sun",
      "Swing",
      "Tree / plant",
      "Water",
      "Wind"
    ],
    "People": [
      "Aunty",
      "Baby",
      "Boy",
      "Brother",
      "Child / children / kids",
      "Child's name",
      "Clown",
      "Cousin",
      "Daddy",
      "Doctor",
      "Friend",
      "Girl",
      "Grandma",
      "Grandpa",
      "Lady",
      "Man",
      "Mummy",
      "People / person",
      "Pet's name",
      "Sister",
      "Teacher",
      "Uncle"
    ],
    "Places to go": [
      "Beach",
      "Farm",
      "Home",
      "Inside / outside",
      "Park / playground",
      "Party",
      "School",
      "Shop",
      "Work",
      "Zoo"
    ],
    "Location Words": [
      "Above",
      "After",
      "Around",
      "Away",
      "Before",
      "Behind",
      "Beside / next to",
      "Down",
      "First",
      "Here",
      "In",
      "Inside",
      "Into",
      "Last",
      "Off",
      "On",
      "On top of",
      "Out",
      "Over",
      "There",
      "Under"
    ],
    "Pronouns": [
      "I",
      "It",
      "Me",
      "Mine",
      "That",
      "This",
      "You"
    ],
    "Quantifiers and articles": [
      "Another",
      "More",
      "None",
      "Not"
    ],
    "Question words": [
      "How",
      "What",
      "When",
      "Where",
      "Which",
      "Who",
      "Why"
    ],
    "Small household items": [
      "Bag / purse",
      "Basket",
      "Blanket",
      "Bottle",
      "Bowl",
      "Box",
      "Broom",
      "Brush / comb",
      "Bucket",
      "Camera",
      "Can",
      "Clock",
      "Coin",
      "Cup",
      "Fork",
      "Glass",
      "Glasses",
      "Hammer",
      "Jar",
      "Keys",
      "Knife",
      "Light",
      "Money",
      "Paper",
      "Picture",
      "Pillow",
      "Plate",
      "Radio",
      "Rubbish",
      "Scissors",
      "Soap",
      "Spoon",
      "Telephone",
      "Tissue",
      "Toothbrush",
      "Towel",
      "Vacuum cleaner",
      "Watch"
    ],
    "Sound effects and animal sounds": [
      "Baa baa",
      "Brmmm-brmmm",
      "Choo-choo",
      "Cocka-doodle-doo",
      "Grrrr",
      "Meow",
      "Moo",
      "Ouch",
      "Quack",
      "Shhhhhh",
      "Uh oh",
      "Woof",
      "Yum yum"
    ],
    "Toys": [
      "Ball",
      "Balloon",
      "Bat / racquet",
      "Block",
      "Book / story",
      "Bubbles",
      "Chalk",
      "Doll",
      "Game",
      "Glue",
      "Pencil / texta/ crayon",
      "Play dough",
      "Puzzle",
      "Toy"
    ],
    "Vehicles (real or toy)": [
      "Aeroplane",
      "Bike",
      "Boat",
      "Bus",
      "Car",
      "Fire truck",
      "Helicopter",
      "Motorbike",
      "Pram",
      "Tractor",
      "Train",
      "Truck"
    ],
    "Words about time": [
      "Day",
      "Morning",
      "Night",
      "Now",
      "Today",
      "Tomorrow",
      "Tonight",
      "Yesterday"
    ]
  };
  keywordsigns = [
    "Ball",
    "Banana",
    "Bath",
    "Big",
    "Bird",
    "Book",
    "Broken",
    "Car",
    "Cat",
    "Dirty",
    "Dog",
    "Drink",
    "Eat",
    "Finished",
    "Flower",
    "Hat",
    "Home",
    "Hot",
    "Hungry",
    "Love",
    "Milk",
    "More",
    "Shoes",
    "Sing",
    "Sleep",
    "Stop",
    "Teddy Bear",
    "Thank You",
    "Tickle",
    "Wash",
    "Wet",
    "Where"
  ]

  constructor(public http: Http, public storage: Storage) {
    this.data = null;
    // console.log('Hello FileServiceProvider Provider');
  }
  getData(file) {
    return this.http.get(file)
      .map(res => res.json());
  }
  getAllWeeks() {
    return this.allWeeks;
  }
  getWeekContent(week) {
    return this.allWeeks[week - 1];
  }
  getKeyWordSigns() {
    return this.keywordsigns;
  }
  getWatchedVideos(){
    return this.watchedVideos;
  }
  getKeyWordSignObject(keyWordArray) {
    return this.http.get('assets/data/key-word-signs.json')
      .map(res => {
        let data = res.json();
        let listWords = [];
        for (var index = 0; index < data.length; index++) {
          if (keyWordArray.includes(data[index].word)) {
            listWords.push(data[index]);
          }
          //handle keywords not found in keyword list here
        }
        return listWords;
        // return res.json()
      });
  }
  findKeyWordSign(keyWord) {

  }
  getWordList() {
    return this.wordList;
  }
  //word list service
  getSavedWordList() {
    return this.savedWordList;
  }
  loadSavedWordList() {

    return this.storage.get('savedWordList').then(data => {
      if (data) {
        this.savedWordList = data;
      } else {
        this.savedWordList = {};
        this.storage.set('savedWordList', this.savedWordList);
      }
    });
  }
  setSavedWordList(wordList) {
    this.savedWordList = wordList;
    this.storage.set('savedWordList', this.savedWordList);
  }
  getActivePage() {
    return this.activePage;
  }
  setActivePage(page) {
    this.activePage = page;
  }
  getCurrentWeek() {
    return this.currentWeek;
  }
  setCurrentWeek(week) {
    this.currentWeek = week;
  }
  getProgress(progress?) {
    return new Promise(resolve => {
      if (progress) {
        this.storage.get('progress').then(data => {
          resolve(data[progress]);
        })
      } else {
        resolve(this.storage.get('progress'));
      }
    })
  }

}
