def sort[A <%  Ordered[A]](list: List[A]): List[A] = 
	if(list.length > 1) {
		val (left, right) = split(list)
		merge(sort(left), sort(right))
	} else { list }

def merge[A <% Ordered[A]](left: List[A], right: List[A]): List[A] = {
	def m(result:List[A], left_rest: List[A], right_rest:List[A]): List[A] = {
		(left_rest, right_rest) match {
			case (l::lr, r::rr) => 
				if(l < r) m((result :+ l),lr,r::rr)
				else m((result :+ r),l::lr,rr)
			case _ => result ++ left_rest ++ right_rest
		}
	}

	m(List(),left,right)
}

def split[A](list: List[A]): (List[A], List[A]) = {
	val half = Math.round(list.length/2)
	(list.take(half), list.takeRight(list.length-half))
}

// command line interface
@main def main(args: String*) = {
	println(sort(List(1,23,41,12,123,51,23)))
}


