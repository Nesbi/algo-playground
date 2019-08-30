def sort(elems):
    if len(elems) <= 1:
        return elems

    half = int(len(elems)/2)
    return merge( sort(elems[:half]), sort(elems[half:]) )

def merge(left, right):
    result = []
    while len(left) > 0 and len(right) > 0:
        if left[0] <= right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))
    # Append rest
    return result + left + right
