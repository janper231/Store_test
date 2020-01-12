import React from 'react';
import { Segment, Button, Icon, Text } from 'native-base';

export function Filtros(state) {
    return (
        <Segment style={{ backgroundColor: "white" }}>
            {
                Object.entries(state).map((data, i) => {
                    return (
                        <Button key={i} style={{ backgroundColor: "white" }} transparent onPress={() => { alert(data[0]) }}>
                            <Icon style={{ color: "black" }} name={data[1] ? "arrow-up" : "arrow-down"} />
                            <Text style={{ color: "black" }}>{data[0].toUpperCase()}</Text>
                        </Button>
                    )
                })
            }
        </Segment>
    );
}