

I'd Buy That
=============

Product Search and Creation


## Dependencies

- node.js (http://nodejs.org/download/)
- npm (included with node.js)

## Getting Started

In the command prompt:

Clone the repository:
```

 > git clone https://github.com/paulb896/IdBuyThat

```

In the IdBuyThat directory:
```

 > npm install
 > node node_modules/bower/bin/bower install

```

Start server:
```

 > node server

```

## Database

### Starting the Database

```
 > sudo mongod -port 3001
```

### Connect to Database

```
 > mongo -host 127.0.0.1:3001
```

### View Products

```
use admin;
db.product.find();
```



# Project Specs


I'd buy that
 - Poll of interest
 - verify with google
 - yes, or no
 Would you buy this product?


 Blurb: elevator pitch of company idea
 Optional image: prototype or concept art
 Total Votes Cast: Sum of verified google accounts voted
 Vote for buying product: User would buy product for suggested price
 Interest: votes for buying product / total votes cast
 Suggested Price: Price user would pay for product upon successful manufacturing and shipping



Have an idea?

My idea is: <Text box>
option between:
 - canvas input
 - image upload
 - external link image
Price: