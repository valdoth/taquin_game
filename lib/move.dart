import 'package:flutter/material.dart';

class Move extends StatelessWidget {
  final int move;
  const Move(this.move, {super.key});

  @override
  Widget build(BuildContext context) {
    return Text(
      "Move: $move",
      style: const TextStyle(
        color: Colors.white,
        decoration: TextDecoration.none,
        fontSize: 18,
      ),
    );
  }
}
