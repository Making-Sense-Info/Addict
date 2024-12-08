import { KeyValue } from "@components/common";

import { DDIBaseObject } from "@model/ddi";

import LinkedObject from "../ddi-object/LinkedObject";

type KeyValueListProps = {
    items: DDIBaseObject[];
    path: string;
};

const KeyValueList = ({ items, path }: KeyValueListProps) => {
    const values = items.map(i => <LinkedObject key={i.URN} item={i} path={path} />);
    return <KeyValue label={"Contains"} values={values} />;
};

export default KeyValueList;
