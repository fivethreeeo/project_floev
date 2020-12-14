import Layout from '../layout/DefaultLayout'
import HelloWorld from '../components/Helloworld'

import { Button } from 'antd'

const IndexPage = () => (
  <Layout title="Floev New Front">
    <div className="app">
      <HelloWorld />
    </div>
    <Button type="primary" block>
      Primary
    </Button>
  </Layout>
)

export default IndexPage