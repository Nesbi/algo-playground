def sort[A <%  Ordered[A]](list: Seq[A]): Seq[A] = 
	if(list.length > 1) {
		val (left, right) = split(list)
		merge(sort(left), sort(right))
	} else { list }

def merge[A <% Ordered[A]](left: Seq[A], right: Seq[A]): Seq[A] = {
	@annotation.tailrec
	def m(result:Seq[A], left_rest: Seq[A], right_rest:Seq[A]): Seq[A] = {
		(left_rest, right_rest) match {
			case (l::lr, r::rr) => 
				if(l < r) m((result :+ l),lr,r::rr)
				else m((result :+ r),l::lr,rr)
			case _ => result ++ left_rest ++ right_rest
		}
	}

	m(List(),left,right)
}

def split[A](list: Seq[A]): (Seq[A], Seq[A]) = {
	val half = Math.round(list.length/2)
	(list.take(half), list.takeRight(list.length-half))
}
