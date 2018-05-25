function simplify(path,epsilon){
        var distanceMax = 0;
        var indexMax = 0;
        var startPoint = path[0];
        var endPoint = path[path.length-1];

        for(var pointIndex = 1; pointIndex < path.length-1; pointIndex++){
            var curPoint = path[pointIndex];
            var curDistance = getDistance(curPoint,startPoint,endPoint);
            if(curDistance > distanceMax){
                distanceMax = curDistance;
                indexMax = pointIndex;
            }
        }

        if(distanceMax > epsilon){
            var result = simplify(path.slice(0,indexMax+1),epsilon);
            result = result.slice(0,result.length-1);
            result = result.concat(simplify(path.slice(indexMax,path.length),epsilon));
            return result;
        }else{
            return [startPoint,endPoint];
        }
}

function getDistance(point,lineStart,lineEnd){
    return Math.abs((lineEnd.y-lineStart.y)*point.x - (lineEnd.x-lineStart.x)*point.y 
	    + lineEnd.x*lineStart.y - lineEnd.y*lineStart.x)
    / Math.sqrt(Math.pow(lineEnd.x - lineStart.x,2)+Math.pow(lineEnd.y - lineStart.y,2));
}
