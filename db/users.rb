module UsersFactory
  User.create({email: "mikebarile13@gmail.com", password: "password", first_name: "Mike", last_name: "Barile", is_host: true, image_url: "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478836007/Icons/default_prof_ynpxur.jpg"})

  male_names = [
    "Lucio",
    "Norberto",
    "Noel",
    "Booker",
    "Bradley",
    "Darren",
    "Prince",
    "Justin",
    "Martin",
    "Lee",
    "Lawerence",
    "Eldon",
    "Randall",
    "Daniel",
    "Octavio",
    "Rusty",
    "Linwood",
    "Jeramy",
    "Mitch",
    "Johnathan",
    "Pat",
    "Ivory",
    "Sonny",
    "Jordan",
    "George",
    "Dave",
    "Ervin",
    "Kerry",
    "Alonso",
    "Warner",
    "Elliot",
    "Ernesto",
    "Miguel",
    "Leo",
    "Calvin",
    "Coy",
    "Brett",
    "Cedrick",
    "Dan",
    "Joaquin",
    "Otha",
    "Leon",
    "Fabian",
    "Donte",
    "Garry",
    "Cameron",
    "Chung",
    "Walter",
    "Jules",
    "Alden"
  ]

  female_names = [
    "Tanesha",
    "Juliette",
    "Lorenza",
    "Rozella",
    "Angelita",
    "Carri",
    "Many",
    "Neta",
    "Alvina",
    "Emilee",
    "Amalia",
    "Lavinia",
    "Shery",
    "Franchesca",
    "Miyoko",
    "Lin",
    "Adina",
    "Dalila",
    "Cornelia",
    "Rachael",
    "Sunni",
    "Carlyn",
    "Carry",
    "Josie",
    "Loreen",
    "Gearldine",
    "Juliet",
    "Glennis",
    "Juliann",
    "Christine",
    "Carlena",
    "Yoshie",
    "Luciana",
    "Donnette",
    "Kristy",
    "Lavona",
    "Kasha",
    "Leila",
    "Roseanne",
    "Aurea",
    "Azzie",
    "Libby",
    "Michiko",
    "Kelsi",
    "Corinna",
    "Crysta",
    "Denae",
    "Jone",
    "Lorita",
    "Jeraldine"
  ]

  male_images = [
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478896886/People/35th_Annual_People_Choice_Awards_Portraits_8OROVpcyM1nl.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897025/People/eadamson710x558.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897055/People/ebedzra710x558.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897096/People/images.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897149/People/mis-portrait1.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897189/People/people_pic.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897271/People/010c443ce9181e9c3678f743b354ced5.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897302/People/images_1.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897333/People/images_2.jpg"
  ]

  female_images = [
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478896813/People/0735796a20d4aee1773f35ed2b2034ef.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478896937/People/20100225_0235.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478896968/People/mwp-portraits003.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897000/People/happy-woman.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897123/People/oadesanya710x558.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897228/People/1.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897358/People/profile-home-makers-vflWnMtf7.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897384/People/profile-office-rachel-vflL0jkun.jpg",
    "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478897418/People/n6cpu9aF.jpg"
  ]

  male_names.each_with_index do |name, idx|
    User.create!({
      email: idx,
      password: "password",
      first_name: male_names.shuffle[0],
      last_name: "default",
      image_url: male_images.shuffle[0],
      is_host: true
    })
  end

  female_names.each_with_index do |name, idx|
    User.create!({
      email: idx + 100,
      password: "password",
      first_name: female_names.shuffle[0],
      last_name: "default",
      image_url: female_images.shuffle[0],
      is_host: true
    })
  end

end
