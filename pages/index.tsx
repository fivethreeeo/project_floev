import Layout from '../layout/DefaultLayout'
import HelloWorld from '../components/Helloworld'
import { Button } from 'antd-mobile'

const IndexPage = () => (
  <Layout title="Floev New Front">
    <div className="app">
      <HelloWorld />
    </div>
    <Button>
      Primary
    </Button>
    
  </Layout>
)

export default IndexPage