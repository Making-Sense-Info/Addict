import { KeyValue } from "@components/common";

import { DDIBaseObject } from "@model/ddi";

import LinkedObject from "../ddi-object/LinkedObject";

type KeyValueListProps = {
    rowLabel: string;
    items: DDIBaseObject[];
    path: string;
};

const KeyValueList = ({ rowLabel, items, path }: KeyValueListProps) => {
    const values = items
        .sort((a, b) => (a.label.toUpperCase() > b.label.toUpperCase() ? 1 : -1))
        .map(i => <LinkedObject key={i.URN} item={i} path={path} />);
    return <KeyValue label={rowLabel} values={values} />;
};

export default KeyValueList;
