# Jewellery Store

Welcome to the Jewellery Store project!

This project is a work-in-progress e-commerce website for a jewellery store. It aims to provide users with a seamless shopping experience for purchasing earrings, rings, necklaces, and bracelets.

### [KNOWN-ISSUES]

- Currently no auth check on user account-pages. view/edit by any user is possible through relevant url (JWT params?)

- In shopping bag "+" and "-" buttons doesn't actually changing the quantity on the BE

### [Upcoming-Features]

- Admin Page > not created yet (add/remove/edit items, set stock quantity, Handle orders)

- Hot Deals Page > not created yet (discounts, best sellers)

- New Arrivals Page > not created yet (items added in the last 3 weeks(ish))

## Live Page on Netlify

Check out the live demo of the Jewellery Store: [Jewellery Store Live Page](https://jewellery-store-semih.netlify.app/)

## Tech Stack

- JavaScript
- React
- Axios
- Tailwind CSS
- OAuth2.0

## Authentication

- OAuth 2.0: Utilized for authentication, providing secure access to the application using OAuth 2.0 protocol.

- JWT (JSON Web Tokens): Used for secure transmission of information between parties, often employed for user authentication.

## Features

- Browse and purchase a variety of jewellery items.
- Filter items by category (earrings, rings, necklaces, bracelets).
- View detailed information about each item.
- Add items to the shopping cart.
- Checkout securely with various payment options.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   git clone https://github.com/......your-user-name....../jewellery-store.git

2. Install dependencies and set your .env files:

   - cd jewellery-store
   - npm install
   - create .env files
     \*REACT_APP_GOOGLE_CLIENT_ID=,
     REACT_APP_BASE_URL=,
     REACT_APP_ALGOLIA_APP_ID=,
     REACT_APP_ALGOLIA_API_KEY=,
     REACT_APP_PAYPAL_CLIENT_ID=,

3. Start the development server:

   - npm run build
   - npm start

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
