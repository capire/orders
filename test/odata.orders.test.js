const cds = require('@sap/cds')
const { GET, POST, PATCH, expect, defaults } = cds.test(__dirname + "/../", '--with-mocks')

describe ('OrdersService', () => {

  beforeAll (()=> {
    cds.requires.queue = { timeout: '1h' }
    defaults.auth = { username: 'alice' }
    defaults.path = '/odata/v4/orders'
  })

  it('check order count', async () => {
    const { data } = await GET(`/Orders`, {
      params: {
        $select: 'OrderNo'
      },
    })
    expect (data.value.length) .to.equal (2)
  })

  it('add new OrderItem to active Order', async () => {
    const { data: data1 } = await POST(`/Orders`, {
      'OrderNo': '3',
      IsActiveEntity: true
    })
    expect (data1.OrderNo) .to.equal ('3')
    const { data: data2 } = await PATCH(`/Orders(${data1.ID})`, {Items:[{
      product_ID: '201',
      quantity: 1
    }]})
    expect (data2.ID) .to.equal (data1.ID)
  })

})
