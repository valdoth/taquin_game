import 'package:flutter/material.dart';

class Time extends StatelessWidget {
  final int secondsPassed;

  const Time(this.secondsPassed, {super.key});

  @override
  Widget build(BuildContext context) {
    return Text(
      "Time: $secondsPassed",
      style: const TextStyle(
        fontSize: 18,
        decoration: TextDecoration.none,
        color: Colors.white,
      ),
    );
  }
}
