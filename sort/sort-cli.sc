// command line interface
import $file.mergesort
import scala.util.{Try, Success}

@main def main(args: String*) = {
	val algorithm_key :: elements = args
	val algorithm = algorithm_key match {
		case "mergesort" => mergesort
		case _ => mergesort
	}
	

	val sorted = Try(elements.map(_.toInt)) match {
		case Success(i) => algorithm.sort(i)
		case _ => Try(elements.map(_.toDouble)) match {
			case Success(d) => algorithm.sort(d)
			case _ => algorithm.sort(elements)
		}
	}
	println(sorted.mkString(" "))
}


