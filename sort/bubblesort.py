def sort(elements):
    while True:
        swapped = False
        for i in range(len(elements)-1):
            if elements[i] > elements[i+1]:
                # swap
                temp = elements[i]
                elements[i] = elements[i+1]
                elements[i+1] = temp
                swapped = True
        if not swapped:
            break
    return elements
