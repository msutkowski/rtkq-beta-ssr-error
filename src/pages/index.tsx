import { GetServerSideProps, NextPage } from "next";
import pokemonApi, {
  getRunningOperationPromises,
  useGetPokemonQuery,
} from "src/services/pokemon";
import { wrapper } from "src/store";
import { useDispatch } from "react-redux";

const Home: NextPage = () => {
  const { refetch, ...result } = useGetPokemonQuery();
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => refetch()}>Refetch</button>
      <button
        onClick={() => dispatch(pokemonApi.util.invalidateTags(["Pokemon"]))}
      >
        Invalidate tags
      </button>
      <pre>
        <code>{JSON.stringify(result, null, 2)}</code>
      </pre>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    store.dispatch(pokemonApi.endpoints.getPokemon.initiate());

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  });

export default Home;
