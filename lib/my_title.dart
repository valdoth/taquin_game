import 'package:flutter/material.dart';

class MyTitle extends StatelessWidget {
  final Size size;

  const MyTitle(this.size, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: size.height * 0.10,
      padding: const EdgeInsets.all(5),
      child: Text(
        "Sliding Puzzle",
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: size.height * 0.04,
          color: Colors.white,
          decoration: TextDecoration.none,
        ),
      ),
    );
  }
}
