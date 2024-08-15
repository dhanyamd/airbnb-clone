'use client'
import { Suspense } from "react";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps{
  searchParams : IListingParams
}

const Home = async({searchParams} : HomeProps) => {
  const currentUser = await getCurrentUser()

  const listings = await getListings(searchParams)

  if(listings.length === 0){
      return (
        <EmptyState showResets/>
      )
    }
      
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2
       md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
       2xl:grid-cols-6 gap-8">
        <Suspense>
        {listings.map((listing )=> {
          return (
              <ListingCard 
              currentUser={currentUser}
              key={listing.id}
              data={listing} 
              />
          )
        })}
        </Suspense>
        </div>
    </Container>
  );
}

export default Home
