import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./Products.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  const [productArray, setproductArray] = useState([]);
  const [loading, setloading] = useState(false);
  const [notfound, setnotfound] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  

 

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   * 
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": https://i.imgur.com/lulqWzW.jpg,
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": https://i.imgur.com/lulqWzW.jpg,
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    // try {
    //   const response = await axios.get(`${config.endpoint}/auth/products`);
    //   setProducts(response.data);
    //   setLoading(false);
    //   } catch (error) {
    //   enqueueSnackbar(error.response.data.message, {
    //   variant: "error",
    //   });
    setloading(true);
    axios.get(`${config.endpoint}/products`)
    .then((response) => {
      // console.log("Successful")

      setproductArray(response.data);
      setloading(false);
    })
    .catch((error) => {
      setnotfound(true);
      setloading(false);
      
    });
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    // try {
    //   const response = await axios.get(
    //   `${config.endpoint}/products/search?value=${text}`
    //   );
    //   setSearchResults(response.data);
    //   } catch (error) {
    //   enqueueSnackbar(error.response.data.message, {
    //   variant: "error",
    //   });
    //   }
    setnotfound(true);
    axios.get(`${config.endpoint}/products/search?value=${text}`)
    .then((response) => {
      if(response.data){
        // console.log("Successful")
        setproductArray(response.data);
      setnotfound(false);
      }
    })
    .catch((error) => {
      setnotfound(true);
      
    });
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
   useEffect(() => {performAPICall();
   },[]);

  const debounceSearch = (event, debounceTimeout) => {
    setTimeout(()=>{
      performSearch(event.target.value);
    },debounceTimeout)
  };




  return (
    <div>
      <Header hasHiddenAuthButtons={false}>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
          className="search-desktop"
          size="small"
          onChange={(event) => debounceSearch(event,500)}
          //fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
        />
      </Header>

      {/* Search view for mobiles */}

      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        onChange={(event) => debounceSearch(event,500)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
      <Grid container>
        <Grid item className="product-grid">
          <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your door step
            </p>
          </Box>
        </Grid>
      </Grid>
      <br/>
      {/* <ProductCard 
        
           product={{
              "name":"Tan Leatherette Weekender Duffle",
              "category":"Fashion",
              "cost":150,
              "rating":4,
              "image":https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png,
              "_id":"PmInA797xJhMIPti"
              }} >
        </ProductCard> */}
      {loading ? (
        <div className="loading">
          <CircularProgress />
          <p>Loading Products</p>
        </div>
      ) : notfound?(
        <div className="loading">
          <SentimentDissatisfied />
          <p>No Products found</p>
        </div>
      ):(
        <Grid container spacing={1}>
          {productArray.map((prd) => {
            return (
            <Grid item xs={12} sm={6} md={3} key={prd._id}>
              <ProductCard product={prd} />
            </Grid>)}
          )}
        </Grid>
      )}

      <Footer />
    </div>
  );

  
};

export default Products;


