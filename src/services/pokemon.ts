import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2",
  }),
  tagTypes: ["Pokemon"],
  refetchOnFocus: false,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getPokemon: build.query<any, void>({
      query: () => ({ url: "/", method: "GET" }),
      providesTags: (result) => (result ? ["Pokemon"] : []),
    }),
  }),
});

export const {
  useGetPokemonQuery,
  util: { getRunningOperationPromises },
} = pokemonApi;

export default pokemonApi;
