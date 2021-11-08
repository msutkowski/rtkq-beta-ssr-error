import { GetServerSideProps, NextPage } from 'next'
import { getPokemon, getRunningOperationPromises } from 'src/services/pokemon'
import { wrapper } from 'src/store'

const Home: NextPage = () => {
  return <span>test</span>
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    store.dispatch(getPokemon.initiate())

    await Promise.all(getRunningOperationPromises())

    return {
      props: {},
    }
  },
)

export default Home
