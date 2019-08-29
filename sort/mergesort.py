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
    
# command line interface
if __name__ == "__main__":
    import sys
    elems = sys.argv[1:]
    if all(e.isdigit() for e in elems):
        elems = [int(e) for e in elems]
    print(" ".join(str(e) for e in sort(elems)))
