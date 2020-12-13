import Layout from '../layout/DefaultLayout'
import HelloWorld from '../components/Helloworld'

const IndexPage = () => (
  <Layout title="Floev New Front">
    <div className="app">
      <HelloWorld />
    </div>
  </Layout>
)

export default IndexPage