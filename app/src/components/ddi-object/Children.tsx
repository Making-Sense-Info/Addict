import { KeyValue } from "@components/common";

import { DDIBaseObject } from "@model/ddi";

import LinkedObject from "./LinkedObject";

type ChildrenProps = {
    items: DDIBaseObject[];
    path: string;
};

const Children = ({ items, path }: ChildrenProps) => {
    const values = items.map(i => <LinkedObject key={i.URN} item={i} path={path} />);
    return <KeyValue label={"Contains"} values={values} />;
};

export default Children;
