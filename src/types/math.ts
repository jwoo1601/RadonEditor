export interface Tuple2D
{
    x: number;
    y: number;
}

export interface Tuple3D
{
    x: number;
    y: number;
    z: number;
}

export interface Tuple4D
{
    x: number;
    y: number;
    z: number;
    w: number;
}

export interface Transform2D
{
    location: Tuple2D;
    rotation: Tuple2D;
    scale: Tuple2D;
}

export interface Transform3D
{
    location: Tuple3D;
    rotation: Tuple3D;
    scale: Tuple3D;
}

export interface Transform4D
{
    location: Tuple4D;
    rotation: Tuple4D;
    scale: Tuple4D;
}