import { GetServerSideProps, NextPage } from 'next'
import { getPokemon, getRunningOperationPromises, useGetPokemonQuery } from 'src/services/pokemon'
import { wrapper } from 'src/store'

const Home: NextPage = () => {
  const result = useGetPokemonQuery(null)

  return (
    <>
      <pre>
        <code>{JSON.stringify(result, null, 2)}</code>
      </pre>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    // * store.dispatch(getPokemon.initiate()) this causes an error
    store.dispatch(getPokemon.initiate(null)) // this doesn't

    await Promise.all(getRunningOperationPromises())

    return {
      props: {},
    }
  },
)

export default Home
