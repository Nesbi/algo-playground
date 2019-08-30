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

def list_algorithms():
    import os
    script_folder, this_script = os.path.split(__file__)
    script_folder = script_folder if script_folder else "."
    scripts = [s for s in os.listdir(script_folder) if ".py" in s and not s == this_script]
    for script in scripts:
        print(script.replace(".py",""))

if __name__ == "__main__":
    import argparse
    import sys

    # Check for list algorithms before parsing arguments to allow ignoring the "ALGORITHM" Name
    if ("-l" in sys.argv or "--list_algorithms" in sys.argv) and not("-h" in sys.argv or "--help" in sys.argv):
        list_algorithms()
    else:
        parser = argparse.ArgumentParser()
        parser.add_argument("ALGORITHM",type=str,help="Name of the algorithm to use for the sorting")
        parser.add_argument("-p","--print_algorithm",action="store_true",help="Print the code of the selected algorithm")
        parser.add_argument("-s","--sort_elements",type=str,nargs="+",help="Sort a list of elements (numerical if all are digits, else alphanumerical)")
        parser.add_argument("-l","--list_algorithms",action="store_true",help="Print a list of all algorithms (Positional arguments do not need to be set if this is set)")
        
        args = parser.parse_args()
        
        if args.print_algorithm:
            print_algorithm(args.ALGORITHM)
        if args.sort_elements:
            sort(args.ALGORITHM,args.sort_elements)

