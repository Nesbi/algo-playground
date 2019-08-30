import argparse

def sort(algorithm,elements):
    try:
        module = __import__(algorithm)
        if all(e.isdigit() for e in elements):
            elements = [int(e) for e in elements]
        print(" ".join(str(e) for e in module.sort(elements)))
    except:
        print("Sortalgorithm '{}' is unkown/not implemented".format(algorithm))

def print_algorithm(algorithm):
    import inspect
    try:
        print(inspect.getsource(__import__(algorithm)))
    except:
        print("Sortalgorithm '{}' is unkown/not implemented".format(algorithm))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("ALGORITHM",type=str,help="Name of the algorithm to use for the sorting")
    parser.add_argument("-p","--print_algorithm",action="store_true",help="Print the code of the selected algorithm")
    parser.add_argument("-s","--sort_elements",type=str,nargs="+",help="Sort a list of elements (numerical if all are digits, else alphanumerical)")
    
    args = parser.parse_args()
    
    if args.print_algorithm:
        print_algorithm(args.ALGORITHM)
    if args.sort_elements:
        sort(args.ALGORITHM,args.sort_elements)

