import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import { Messages } from 'primereact/messages';

const ItemList = styled.ul`
    padding: 0;
    margin: 0 500px;
`

const Item = styled.li`
    display: flex;
    padding: 10px;
    margin-bottom: 10px;
    img {
        margin-right: 15px;
    }

`

const ItemBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    button {
        align-self: flex-start;
    }
`

const ItemBodyHeader = styled.div`
    display: flex;
    justify-content: space-between;
    > h3 {
        margin: 0;
    }
    > span {
        color: gray;
    }
`

const items = [{
    _id: 'abc',
    name: '1',
    available: true,
    date: new Date()
}]

for (let i = 0; i < 10; ++i) {
    items.push({ ...items[0], name: i })
}

function BorrowList() {
    const messages = useRef()
    return (
        <div>
            <ItemList>
                <Messages ref={messages} />
                {items.map((item, index) => (
                    <Item key={item._id + index}>
                        <img src='https://via.placeholder.com/200' alt={`${item._id}img`}/>
                        <ItemBody>
                            <div>
                                <ItemBodyHeader>
                                    <h3>{item.name}</h3>
                                    <span>{item.date.toString()}</span>
                                </ItemBodyHeader>
                                <p>Description</p>
                            </div>
                            <Button label='Borrow' onClick={e => messages.current.show({ severity: 'error', summary: 'Unable to fetch', detail: 'Details here' })} />
                        </ItemBody>
                        
                    </Item>
                ))}
            </ItemList>
        </div>
    )
}

export default BorrowList
